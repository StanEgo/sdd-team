import { THttpStatusCode, HttpStatusCode, HtmlTagHtml, THtmlTagHtml } from "@xde.labs/aspects";

import { PrimitiveFunctor } from "../../../functor/PrimitiveFunctor";

export class Code404Html extends PrimitiveFunctor<THttpStatusCode<404>, THtmlTagHtml> {
	name = "Code404Html";
	from = [
		{
			aspect: HttpStatusCode,
			lambda: (obj: THttpStatusCode<404>) => obj[HttpStatusCode] === 404,
		},
	];
	to = [HtmlTagHtml];

	distinct(): THtmlTagHtml {
		return {
			[HtmlTagHtml]: "<div>404 page</div>",
		};
	}
}

const code404HtmlInstance = new Code404Html();
export default code404HtmlInstance;
