import { Transforms, Editor } from 'slate';
import { H1, H2, H3, H4, H5, H6, HR } from "./schema";
import { insertThematicBreak } from "./toolbarHelpers";

export const matchCases = (editor, currentLine) => {

	const matchHeadings = (editor, currentLine) => {
		const headingMatchCase = currentLine.match(/(^\s*)#{1,6}\s/m);
		if(!headingMatchCase) return;

		const count = (headingMatchCase[0].match(/#/g) || []).length;
				
switch (count) {
    case 1:{
        Transforms.setNodes(editor, { type: H1 });
        break;
    }
    case 2:{
        Transforms.setNodes(editor, { type: H2 });
        break;
    }
    case 3:{
        Transforms.setNodes(editor, { type: H3 });
        break;
    }
    case 4:{
        Transforms.setNodes(editor, { type: H4 });
        break;
    }
    case 5:{
        Transforms.setNodes(editor, { type: H5 });
        break;
    }
    case 6:{
        Transforms.setNodes(editor, { type: H6 });
        break;
    }

}


		Editor.deleteBackward(editor, { unit: 'word' });
		return;
	}

	const matchPageBreak = (editor, currentLine)=>{
		const pageBreakMatchCase = currentLine.match(/(^\s*)([*-])(?:[\t ]*\2){2,}/m);
		if(!pageBreakMatchCase) return

		Editor.deleteBackward(editor, { unit: 'word' });
		insertThematicBreak(editor, HR);

		return;
	}

	matchHeadings(editor, currentLine);
	matchPageBreak(editor, currentLine);
}
