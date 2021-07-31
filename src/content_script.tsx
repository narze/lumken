import Skoy from "skoy"
import "./styles.css"

let currentInput: any

function leetify(input: string) {
  return input
    .replace(/อ/g, "o")
    .replace(/[ไใ]/g, "1")
    .replace(/เ/g, "!")
    .replace(/แ/g, "ll")
    .replace(/ะ/g, "=")
    .replace(/[พผ]/g, "w")
    .replace(/่/g, "'")
    .replace(/ย/g, "e")
    .replace(/ล/g, "a")
    .replace(/ง/g, "J")
    .replace(/ท/g, "n")
    .replace(/ร/g, "s")
    .replace(/น/g, "u")
    .replace(/[ัิ]/g, "^")
}

chrome.runtime.onMessage.addListener(async function (
  msg,
  sender,
  sendResponse
) {
  if (msg.type === "leet_input") {
    console.log({ currentInput })
    if (currentInput) {
      const transformedText = leetify(
        currentInput?.value || currentInput.textContent
      )

      replaceText(transformedText, currentInput)
    }
  } else if (msg.type === "expand_input") {
    console.log({ currentInput })
    if (currentInput) {
      const transformedText = (currentInput?.value || currentInput.textContent)
        .replace(/ำ/g, "ํา")
        .split("")
        .join(" ")
        .replace(/ ([ํั่้๊๋์ิืึุูี็])/g, "$1")

      replaceText(transformedText, currentInput)
    }
  } else if (msg.type === "unexpand_input") {
    if (currentInput) {
      const transformedText = (currentInput?.value || currentInput.textContent)
        .split(" ")
        .join("")

      replaceText(transformedText, currentInput)
    }
  } else if (msg.type === "skoyify") {
    if (currentInput) {
      const transformedText = Skoy.convert(
        currentInput?.value || currentInput.textContent
      )

      replaceText(transformedText, currentInput)
    }
  } else if (msg.type === "puan") {
    if (currentInput) {
      sendResponse(currentInput?.value || currentInput.textContent)
    }
  } else if (msg.type === "puan_result") {
    if (currentInput) {
      replaceText(msg.text, currentInput)
    }
  } else if (msg.type === "lu") {
    if (currentInput) {
      sendResponse(currentInput?.value || currentInput.textContent)
    }
  } else if (msg.type === "lu_result") {
    if (currentInput) {
      replaceText(msg.text, currentInput)
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

  currentInput = element
})

document.body.addEventListener("focusin", function (e) {
  const element = e.target as HTMLElement

  currentInput = element
})

if (document.activeElement) {
  currentInput = document.activeElement
}

// function insertTextAtCursor(text: string) {
//   var el = document.activeElement as any
//   var val = el.value
//   var endIndex
//   var range
//   var doc = el.ownerDocument
//   if (
//     typeof el.selectionStart === "number" &&
//     typeof el.selectionEnd === "number"
//   ) {
//     endIndex = el.selectionEnd
//     el.value = val.slice(0, endIndex) + text + val.slice(endIndex)
//     el.selectionStart = el.selectionEnd = endIndex + text.length
//   } else if (doc.selection !== "undefined" && doc.selection.createRange) {
//     el.focus()
//     range = doc.selection.createRange()
//     range.collapse(false)
//     range.text = text
//     range.select()
//   }
// }

function replaceText(text: string, element: any) {
  if (element.value) {
    element.value = text
    element.classList.add("lumken-shake")

    setTimeout(() => {
      element.classList.remove("lumken-shake")
    }, 200)
  } else if (element.textContent) {
    const xpath = `//*[text()='${element.textContent}']`
    const matchingElement = document.evaluate(
      xpath,
      element,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue

    if (matchingElement) {
      matchingElement.textContent = text
      ;(matchingElement as any).classList.add("lumken-shake")

      setTimeout(() => {
        ;(matchingElement as any).classList.remove("lumken-shake")
      }, 200)

      // TODO: Trigger change event so that the input persists in the DOM
      // Now you can press space once instead
    }
  }

  const key =
    navigator.platform.toUpperCase().indexOf("MAC") >= 0 ? "Meta" : "Control"

  element.dispatchEvent(
    new KeyboardEvent("keyup", {
      key,
      bubbles: true,
    })
  )

  element.dispatchEvent(
    new Event("change", {
      bubbles: true,
    })
  )

  document.execCommand("paste")
}
