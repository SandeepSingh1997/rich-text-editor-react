import { useRef, useEffect } from "react";
export default function RichTextEditor() {
  const textAreaRef = useRef(null);

  function handleConvert() {}

  function getSelectionStartAndEnd(anchorOffset, focusOffset) {
    const start = anchorOffset <= focusOffset ? anchorOffset : focusOffset;
    const end = start === anchorOffset ? focusOffset : anchorOffset;
    return [start, end];
  }
  useEffect(() => {
    textAreaRef.current.innerHTML = "Bold";
  });

  function handleBold() {
    const selection = document.getSelection();
    console.log(
      "selection object:",
      selection,
      "selection Text: ",
      selection.toString()
    );
    //if the start and end of the selection are the same
    if (selection.isCollapsed) {
      return;
    }

    //if the anchodNode exists
    if (selection.anchorNode !== null) {
      //if the anchorNode is text node

      const anchorNode = selection.anchorNode;
      const focusNode = selection.focusNode;
      const anchorOffset = selection.anchorOffset;
      console.log("anchor node: ", anchorNode, anchorOffset);

      const focusOffset = selection.focusOffset;
      console.log("focus node: ", focusNode, focusOffset);

      const [startIndexSelection, endIndexSelection] = getSelectionStartAndEnd(
        anchorOffset,
        focusOffset
      );
      const textBefore = anchorNode.textContent.substring(
        0,
        startIndexSelection
      );
      if (anchorNode === focusNode) {
        if (anchorNode.nodeType === Node.TEXT_NODE) {
          console.log("Text found !!!");

          console.log(
            anchorNode.textContent.substring(anchorOffset, focusOffset)
          );

          const selectedText = anchorNode.textContent.substring(
            startIndexSelection,
            endIndexSelection
          );
          const textAfter = anchorNode.textContent.substring(endIndexSelection);

          const parentNode = anchorNode.parentElement;

          // console.log(parentNode.childNodes);

          const updatedChild = `${textBefore}<b>${selectedText}</b>${textAfter}`;

          let parentUpdatedInnerHtml = "";

          const childArray = Array.from(parentNode.childNodes);
          for (const child of childArray) {
            if (child !== anchorNode) {
              if (child.nodeType === Node.TEXT_NODE) {
                parentUpdatedInnerHtml += child.textContent;
              } else if (child.nodeType === Node.ELEMENT_NODE) {
                parentUpdatedInnerHtml += child.outerHTML;
              }
            } else {
              parentUpdatedInnerHtml += updatedChild;
            }
          }

          // console.log(parentUpdatedInnerHtml);

          parentNode.innerHTML = parentUpdatedInnerHtml;
        } else if (anchorNode.nodeType === Node.ELEMENT_NODE) {
          console.log("Element found !!!");
          console.log(
            anchorNode.innerHTML.substring(anchorOffset, focusOffset)
          );
        } else {
          return;
        }
      } else {
        //When Anchor and focus nodes are different
        console.log("anchor and focus nodes are different");
        const anchorUpdate = anchorNode.textContent.substring(anchorOffset);
        const anchorText = `${anchorNode.textContent.substring(
          0,
          anchorOffset
        )}<b>${anchorUpdate}</b>`;

        const focusUpdate = focusNode.textContent.substring(0, focusOffset);
        const focusText = `<b>${focusUpdate}</b>${focusNode.textContent.substring(
          focusOffset
        )}`;
        console.log(anchorUpdate + " " + focusUpdate);

        let anchorNodeInnerHtml = anchorNode.parentNode.outerHTML;
        let focusNodeInnerHtml = focusNode.parentNode.outerHTML;
        if (anchorNode.parentNode === textAreaRef.current) {
          anchorNodeInnerHtml = anchorNode.textContent;
        }
        if (focusNode.parentNode === textAreaRef.current) {
          focusNodeInnerHtml = focusNode.textContent;
        }
        console.log(anchorNodeInnerHtml + "\n" + focusNodeInnerHtml);

        for (let child of Array.from(anchorNode.parentElement.childNodes)) {
          if (child === anchorNode) {
            const updatedChild = document.createElement("span");
            updatedChild.innerHTML = anchorText;
            child.replaceWith(updatedChild);
            console.log(child);
          }
        }
        for (let child of Array.from(focusNode.parentElement.childNodes)) {
          if (child === focusNode) {
            const updatedChild = document.createElement("span");
            updatedChild.innerHTML = focusText;
            child.replaceWith(updatedChild);
            console.log(child);
          }
        }
        console.log(anchorText + " " + focusText);
      }
    } else {
      return;
    }
    console.log("text area now has : ", textAreaRef.current.innerHTML);
  }

  //Not relevant to mutation as of now
  function handleSayHello() {
    const divNode = textAreaRef.current;
    const spanNode = document.createElement("span");
    const textNode = document.createTextNode("Hello!");
    spanNode.appendChild(textNode);
    divNode.appendChild(spanNode);
    divNode.style.backgroundColor = "#ff0000";
  }

  return (
    <div>
      <div
        className="container"
        style={{
          height: "100px",
          backgroundColor: "aqua",
          border: "1px solid black",
        }}
        contentEditable={true}
        ref={textAreaRef}
      ></div>
      <button onClick={handleSayHello}>say hello</button>
      <button onClick={handleBold}>bold</button>
    </div>
  );
}
