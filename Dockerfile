# Используем базовый образ Node.js с Alpine для уменьшения размера
FROM node:18-alpine AS build

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем файлы package.json и package-lock.json
COPY package*.json ./

# Устанавливаем все зависимости, включая devDependencies, так как нам нужны инструменты для сборки
RUN npm install

# Копируем все файлы проекта в контейнер
COPY . .

# Запускаем сборку проекта Vite
RUN npm run build

# Production stage с минимальным образом
FROM node:18-alpine AS production

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json для установки production-зависимостей
COPY package*.json ./

# Устанавливаем только необходимые зависимости для запуска
RUN npm ci --only=production

# Копируем скомпилированные файлы из стадии сборки
COPY --from=build /app/dist ./dist

# Если требуется запуск сервера Vite, откройте нужный порт
# EXPOSE 3000

# Если требуется запуск приложения, добавьте соответствующую команду запуска
# CMD ["node", "dist/server.js"]
