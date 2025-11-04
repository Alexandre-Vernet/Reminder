import { Module } from '@nestjs/common';
import { RootController } from "./root.controller";

@Module({
  imports: [],
  controllers: [RootController],
})
export class RootModule {}
