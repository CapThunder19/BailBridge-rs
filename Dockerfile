# Build stage
FROM rust:1.75 as builder

WORKDIR /app

# Copy manifests
COPY BailBridge-rs/Cargo.toml BailBridge-rs/Cargo.lock ./

# Copy source code
COPY BailBridge-rs/src ./src
COPY BailBridge-rs/migrations ./migrations
COPY BailBridge-rs/.env.example ./.env

# Build the application
RUN cargo build --release

# Runtime stage
FROM debian:bookworm-slim

WORKDIR /app

# Install runtime dependencies
RUN apt-get update && apt-get install -y \
    ca-certificates \
    libssl3 \
    libpq5 \
    && rm -rf /var/lib/apt/lists/*

# Copy the binary from builder
COPY --from=builder /app/target/release/BailBridge-rs /app/bailbridge

# Copy migrations
COPY --from=builder /app/migrations /app/migrations

# Expose port
EXPOSE 8080

# Set environment variables
ENV RUST_LOG=info

# Run the application
CMD ["/app/bailbridge"]
