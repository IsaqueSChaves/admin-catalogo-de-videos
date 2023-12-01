import { Uuid } from "@core/@shared/domain/value-objects/uuid.vo";
import Category from "../../../domain/category.entity";
import { ICategoryRepository } from "../../../domain/category.repository";
import { NotFoundError } from "@core/@shared/domain/errors/not-found-error";
import { IUseCase } from "@core/@shared/application/use-case.interface";
import { CategoryOutput, CategoryOutputMapper } from "../common/category-output";

export class GetCategoryUseCase
    implements IUseCase<GetCategoryInput, GetCategoryOutput>
{
    constructor(private categoryRepo: ICategoryRepository) { }

    async execute(input: GetCategoryInput): Promise<GetCategoryOutput> {
        const uuid = new Uuid(input.id);
        const category = await this.categoryRepo.findById(uuid);
        if (!category) {
            throw new NotFoundError(input.id, Category);
        }

        return CategoryOutputMapper.toOutput(category);
    }
}

export type GetCategoryInput = {
    id: string;
};

export type GetCategoryOutput = CategoryOutput;