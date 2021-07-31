import axios from "axios"
import React, { useEffect, useMemo, useState } from "react"
import ReactDOM from "react-dom"
import "twind/shim"

const Popup = () => {
  const [modeIdx, setModeIdx] = useState(localStorage.LUMKEN_MODE || 0)
  const [modes, setModes] = useState<any>([])

  useEffect(() => (localStorage.LUMKEN_MODE = modeIdx), [modeIdx])

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
            )
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
  const lu = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tab = tabs[0]
      if (tab.id) {
        chrome.tabs.sendMessage(
          tab.id,
          {
            type: "lu",
          },
          async (msg) => {
            const response = await axios.get(
              `https://kampuan-api.herokuapp.com/puan_lu/${msg}?translate_lu=false`,
              {
                headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                },
              }
            )
            const text = response.data.results.join("")

            chrome.tabs.sendMessage(
              tab.id as number,
              {
                type: "lu_result",
                text,
              },
              (msg) => {}
            )
          }
        )
      }
    })
  }

  useEffect(() => {
    chrome.commands.getAll((commands) => {
      const modes = [
        {
          key: "leet",
          label: "!กม!มos์oมตีu",
          onClick: leetText,
          shortcut: "",
        },
        {
          key: "expand",
          label: " พ รี่ ค า ซึ ย ะ",
          onClick: expandText,
          shortcut: "",
        },
        {
          key: "skoyify",
          label: "สก๊อยษ์ฌ์ซ์ว์",
          onClick: skoyIfy,
          shortcut: "",
        },
        { key: "puan", label: "ควนผำ", onClick: puan, shortcut: "" },
        { key: "lu", label: "ลาภูหลาษูซูลี", onClick: lu, shortcut: "" },
      ]

      modes.forEach(({ key }, idx) => {
        const matchedCommand = commands.find(({ name }) => name === key)
        if (matchedCommand) {
          modes[idx].shortcut = matchedCommand.shortcut || ""
        }
      })

      setModes(modes)
    })
  }, [])

  const currentMode = useMemo(() => modes[modeIdx], [modeIdx, modes])

  return (
    <main className="w-80 h-80 p-4 flex flex-col gap-4">
      <h1 className="text-3xl text-blue-300">
        <span className="text-red-100 text-opacity-40 text-2xl">หมวย</span>
        เล่นคำ
        <span className="text-red-300">ลำเค็ญ</span>
      </h1>

      {currentMode && (
        <button
          onClick={currentMode.onClick}
          className="relative text-yellow-600 flex-1 text-2xl border rounded"
        >
          โหมด<span className="text-blue-300">{currentMode.label}</span>
          <div className="text-gray-400 text-base">{currentMode.shortcut}</div>
          <div className="absolute right-1 bottom-1 text-gray-300 text-sm">
            (Click to apply)
          </div>
        </button>
      )}

      <button
        onClick={() => setModeIdx((modeIdx + 1) % modes.length)}
        className="p-2 bg-green-200 rounded text-base font-bold"
      >
        เปลี่ยนโหมด
      </button>
    </main>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
)
