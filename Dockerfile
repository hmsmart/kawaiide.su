# Use the official nginx image as base
FROM nginx:1.29.8-alpine@sha256:582c496ccf79d8aa6f8203a79d32aaf7ffd8b13362c60a701a2f9ac64886c93d

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
