import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import { BubbleMenu, EditorProvider, FloatingMenu, ReactNodeViewRenderer } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { all, createLowlight } from 'lowlight';

import CodeBlockComponent from './extensions/CodeBlockComponent';

import './index.css';

const lowlight = createLowlight(all);

const extensions = [
  StarterKit,
  TextStyle,
  Color,
  CodeBlockLowlight.extend({
    addNodeView() {
      return ReactNodeViewRenderer(CodeBlockComponent);
    },
  }).configure({ lowlight }),
];

const content = `
        <p>
          That's a boring paragraph followed by a fenced code block:
        </p>
        <pre><code class="language-javascript">for (var i=1; i <= 20; i++)
{
  if (i % 15 == 0)
    console.log("FizzBuzz");
  else if (i % 3 == 0)
    console.log("Fizz");
  else if (i % 5 == 0)
    console.log("Buzz");
  else
    console.log(i);
}</code></pre>
        <p>
          Press Command/Ctrl + Enter to leave the fenced code block and continue typing in boring paragraphs.
        </p>
      `;
const Tiptap = () => {
  return (
    <EditorProvider extensions={extensions} content={content}>
      <FloatingMenu editor={null}>This is the floating menu</FloatingMenu>
      <BubbleMenu editor={null}>This is the bubble menu</BubbleMenu>
    </EditorProvider>
  );
};

export default Tiptap;
