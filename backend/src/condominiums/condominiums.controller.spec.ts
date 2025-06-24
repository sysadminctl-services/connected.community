import { Test, TestingModule } from '@nestjs/testing';
import { CondominiumsController } from './condominiums.controller';

describe('CondominiumsController', () => {
  let controller: CondominiumsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CondominiumsController],
    }).compile();

    controller = module.get<CondominiumsController>(CondominiumsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
