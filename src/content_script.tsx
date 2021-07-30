let currentInput: any

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.type === "expand_input") {
    if (currentInput) {
      const expandedText = currentInput.value.split("").join(" ")

      currentInput.value = expandedText
    }
  } else if (msg.type === "unexpand_input") {
    if (currentInput) {
      const unexpandedText = currentInput.value.split(" ").join("")

      currentInput.value = unexpandedText
    }
  } else if (msg.type === "expand") {
    console.log("Received text = " + msg.text)
    sendResponse(`expanded to : ${msg.text.split("").join("xxxxxx")}`)
  } else if (msg.color) {
    console.log("Receive color = " + msg.color)
    document.body.style.backgroundColor = msg.color
    sendResponse("Change color to " + msg.color)
  } else {
    sendResponse("Color message is none.")
  }
})

document.body.addEventListener("click", function (e) {
  const element = e.target as HTMLElement

  if (["INPUT", "TEXTAREA"].includes(element.tagName)) {
    currentInput = element
  }
})

document.body.addEventListener("focusin", function (e) {
  const element = e.target as HTMLElement

  if (["INPUT", "TEXTAREA"].includes(element.tagName)) {
    currentInput = element
  }
})

if (document.activeElement) {
  if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
    currentInput = document.activeElement
  }
}
