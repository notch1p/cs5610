import AssignmentItem from "./AssignmentItem";

export default async function Assignments({
  params,
}: {
  params: Promise<{ cid: string }>;
}) {
  const { cid } = await params;
  return (
    <div id="wd-assignments">
      {/* search input, + Group, + Assignment */}
      <input
        type="text"
        placeholder="Search for Assignments"
        id="wd-search-assignment"
      />
      &nbsp;
      <button id="wd-add-assignment-group">+ Group</button>&nbsp;
      <button id="wd-add-assignment">+ Assignment</button>
      {/* h3 wd-assignments-title */}
      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total&nbsp;<button>+</button>
      </h3>
      <ul id="wd-assignment-list">
        {/* at least three AssignmentItems using cid */}
        <AssignmentItem cid={cid} aid="hw1" title="A1">
          some details for A1
        </AssignmentItem>
        <AssignmentItem cid={cid} aid="hw2" title="A2">
          some details for A2
        </AssignmentItem>
        <AssignmentItem cid={cid} aid="hw3" title="A3">
          some details for A3
        </AssignmentItem>
      </ul>
    </div>
  );
}
