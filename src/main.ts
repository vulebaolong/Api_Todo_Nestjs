import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";

const port = process.env.PORT || 3002;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    // Tùy chỉnh CORS
    app.enableCors({
        origin: "*", // Đặt nguồn truy cập cho phép
        // methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Các phương thức HTTP cho phép
        // credentials: true, // Cho phép truy cập với credentials (cookie)
    });
    await app.listen(port);
    console.log(`Lắng nghe cổng http://localhost:${port} ...`);
}
bootstrap();
