import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"

const Popup = () => {
  const [count, setCount] = useState(0)
  const [currentURL, setCurrentURL] = useState<string>()

  useEffect(() => {
    chrome.browserAction.setBadgeText({ text: count.toString() })
  }, [count])

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      setCurrentURL(tabs[0].url)
    })
  }, [])

  const changeBackground = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tab = tabs[0]
      if (tab.id) {
        chrome.tabs.sendMessage(
          tab.id,
          {
            color: "#555555",
          },
          (msg) => {
            console.log("result message:", msg)
          }
        )
      }
    })
  }

  const expandText = () => {
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
  }

  const unexpandText = () => {
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
  }

  const skoyIfy = () => {
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
  }

  return (
    <>
      <button onClick={expandText}>E X P A N D !</button>
      <button onClick={unexpandText}>UNEXPAND</button>
      <button onClick={skoyIfy}>Skoy-ify</button>
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
)
