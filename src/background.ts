import axios from "axios"

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
  switch (command) {
    case "leet":
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const tab = tabs[0]
        if (tab.id) {
          chrome.tabs.sendMessage(
            tab.id,
            {
              type: "leet_input",
            },
            (msg) => {
              // console.log("result message:", msg)
            }
          )
        }
      })
      break
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
    case "skoyify":
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const tab = tabs[0]
        if (tab.id) {
          chrome.tabs.sendMessage(
            tab.id,
            {
              type: "skoyify",
            },
            (msg) => {
              // console.log("result message:", msg)
            }
          )
        }
      })
    case "puan":
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const tab = tabs[0]
        if (tab.id) {
          chrome.tabs.sendMessage(
            tab.id,
            {
              type: "puan",
            },
            async (msg) => {
              const response = await axios.get(
                `https://kampuan-api.herokuapp.com/puan_kam/${msg}?all=false`,
                {
                  headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                  },
                }
                // { mode: "no-cors", headers: [["accept", "application/json"]],  }
              )
              // console.log("result message:", msg)
              const text = response.data.results.join("")

              chrome.tabs.sendMessage(
                tab.id as number,
                {
                  type: "puan_result",
                  text,
                },
                (msg) => {}
              )
            }
          )
        }
      })
    default:
      break
  }
})
