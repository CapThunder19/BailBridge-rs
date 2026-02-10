use axum::{Router, routing::{post, get}, middleware, Extension};
use crate::{
    auth::handlers::{register_user, login_user},
    bail::handlers::{
        create_bail_application, get_bail_application, 
        get_my_bail_applications, get_all_bail_applications_for_lawyer,
        assign_lawyer_to_case
    },
    db::DbPool,
    config::Config,
};


pub fn create_routes(db: DbPool, config: Config) -> Router {

    let public_routes = Router::new()
        .route("/register", post(register_user))
        .route("/login", post(login_user))
        .with_state((db.clone(), config.clone()));

    
    let protected_routes = Router::new()
        .route("/bail-applications", post(create_bail_application))
        .route("/bail-applications/my", get(get_my_bail_applications))
        .route("/bail-applications/all", get(get_all_bail_applications_for_lawyer))
        .route("/bail-applications/:application_number", get(get_bail_application))
        .route("/bail-applications/:application_number/assign", post(assign_lawyer_to_case))
        .layer(middleware::from_fn(move |req, next| {
            let config = config.clone();
            async move {
                let mut req = req;
                req.extensions_mut().insert(config);
                next.run(req).await
            }
        }))
        .with_state(db);

    Router::new()
        .merge(public_routes)
        .merge(protected_routes)
}