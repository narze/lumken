import axios from "axios"
import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import "twind/shim"

const Popup = () => {
  useEffect(() => {
    chrome.browserAction.setBadgeText({ text: "" })
  }, [])

  const leetText = () => {
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
  const puan = () => {
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
  }

  return (
    <main className="w-80 h-80 p-4">
      <h1 className="text-3xl text-blue-300">
        เล่นคำ<span className="text-red-300">ลำเค็ญ</span>
      </h1>
      <button onClick={leetText}>โหมด!กม!มos์</button>
      <button onClick={expandText} className="bg-red-400">
        โหมดพ รี่ ค า ซึ ย ะ
      </button>
      <button onClick={skoyIfy}>โหมฎสก๊อยษ์ฌ์</button>
      <button onClick={puan}>โหมดผำควน</button>
      {/* <button onClick={unexpandText}>UNEXPAND</button> */}
    </main>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
)
