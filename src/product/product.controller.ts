import { Controller, Body, Post } from '@nestjs/common';

@Controller('product')
export class ProductController {
    @Post()
    createProduct(@Body()){}
}
