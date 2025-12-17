# Use the official nginx image as base
FROM nginx:1.29.3@sha256:2f4e10193b0c4f61472245e9d26cea78e7df7af266c7e7cf5e67353ee2731b51

# Remove the default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy all website files to nginx web directory
COPY src/ /usr/share/nginx/html/

# Create a custom nginx configuration for better performance
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    # Enable gzip compression \
    gzip on; \
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript; \
    \
    # Cache static assets - more reasonable for development \
    location ~* \.(jpg|jpeg|png|gif|ico|mp4)$ { \
    expires 7d; \
    add_header Cache-Control "public"; \
    } \
    \
    # Shorter cache for CSS/JS during development \
    location ~* \.(css|js)$ { \
    expires 1h; \
    add_header Cache-Control "public, must-revalidate"; \
    } \
    \
    # Main location block \
    location / { \
    try_files $uri $uri/ /index.html; \
    } \
    }' > /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
