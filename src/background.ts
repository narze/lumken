function polling() {
  // console.log("polling");
  setTimeout(polling, 1000 * 30)
}

polling()

chrome.contextMenus.create({
  title: "EXPANDER",
  contexts: ["page", "selection", "image", "link"],
  onclick: (e) => {
    console.log({ e })
    console.log("clicked")

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tab = tabs[0]
      if (tab.id) {
        chrome.tabs.sendMessage(
          tab.id,
          {
            type: "expand_input",
          },
          (msg) => {
            // console.log("result message:", msg)
          }
        )
      }
    })
  },
})

chrome.commands.onCommand.addListener((command) => {
  console.log(`Command: ${command}`)
  switch (command) {
    case "expand":
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const tab = tabs[0]
        if (tab.id) {
          chrome.tabs.sendMessage(
            tab.id,
            {
              type: "expand_input",
            },
            (msg) => {
              // console.log("result message:", msg)
            }
          )
        }
      })
      break
    case "unexpand":
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const tab = tabs[0]
        if (tab.id) {
          chrome.tabs.sendMessage(
            tab.id,
            {
              type: "unexpand_input",
            },
            (msg) => {
              // console.log("result message:", msg)
            }
          )
        }
      })
    default:
      break
  }
})
