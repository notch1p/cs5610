import AnchorTag from "./AnchorTag";
import Forms from "./forms/Forms";
import HeadingTags from "./HeadingTags";
import HighlightedBoxLab from "./HighlightedBox";
import HighlightedParagraphLab from "./HighlightedParagraph";
import Images from "./Images";
import ListTags from "./ListTags";
import ParagraphTag from "./ParagraphTag";
import Tables from "./Tables";

export default function Lab1() {
  return (
    <div id="wd-lab1">
      <h2>Lab 1</h2>
      <h3>HTML Examples</h3>
      <HeadingTags />
      <ParagraphTag />
      <ListTags />
      <Tables />
      <Images />
      <Forms />
      <HighlightedParagraphLab />
      <HighlightedBoxLab />
      <AnchorTag />
      {/* do the next exercise here */}
    </div>
  );
}
