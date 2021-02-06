import type { PieceContext } from '@sapphire/pieces';
import { Identifiers } from '../lib/errors/Identifiers';
import { Argument, ArgumentResult } from '../lib/structures/Argument';
import type { BoundedArgumentContext } from '../lib/types/Arguments';

export class CoreArgument extends Argument<number> {
	public constructor(context: PieceContext) {
		super(context, { name: 'number' });
	}

	public run(parameter: string, context: BoundedArgumentContext): ArgumentResult<number> {
		const parsed = Number(parameter);

		if (Number.isNaN(parsed)) {
			return this.error({
				parameter,
				message: 'The argument did not resolve to a valid number.',
				context
			});
		}

		const { minimum, maximum } = context;

		if (minimum && parsed < minimum) {
			return this.error({
				parameter,
				identifier: Identifiers.ArgumentNumberTooSmall,
				message: `The argument must be greater than ${context.minimum}.`,
				context
			});
		}

		if (maximum && parsed > maximum) {
			return this.error({
				parameter,
				identifier: Identifiers.ArgumentNumberTooBig,
				message: `The argument must be smaller than ${context.maximum}.`,
				context
			});
		}

		return this.ok(parsed);
	}
}
