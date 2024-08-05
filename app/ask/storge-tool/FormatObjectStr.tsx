"use client";
import { Input, Button, Textarea } from "@nextui-org/react";
import { message } from "antd";
import React from "react";

/**
 * 格式化数据库中的大对象
 */
export const FormatObjectStr = () => {
  const [value, setValue] = React.useState("");

  const [formatValue, setFormatValue] = React.useState("");

  const handleChange = (val: string, indent: number = 4) => {
    let str = val.replace(/\(\[/g, "([\n");
    str = str.replace(/\({/g, "({\n");
    str = str.replace(/,/g, ",\n");

    const lineArr = str.split("\n");

    const newLineArr: string[] = [];

    let curIndentLevel = 0;

    console.log(lineArr);

    lineArr.forEach((v, i) => {
      if (
        v.endsWith("]),") ||
        v.endsWith("])") ||
        v.endsWith("}),") ||
        v.endsWith("})")
      ) {
        curIndentLevel--;
      }

      const indentStr =
        curIndentLevel > 0 ? " ".repeat(curIndentLevel * indent) : "";
      let r = `${indentStr}${v}`;

      if (v.endsWith("([") || v.endsWith("({")) {
        curIndentLevel++;
      }

      newLineArr.push(r);
    });

    console.log("newLineArr = ", newLineArr);

    setFormatValue(newLineArr.join("\n"));
  };

  const copy = async () => {
    let text = formatValue.replaceAll("\n", "");
    text = text.replaceAll(" ", "");

    try {
      await navigator.clipboard.writeText(text);
      message.success("复制成功");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4">
        <Input
          type="email"
          label="输入原始报文"
          value={value}
          onChange={(evt) => {
            setValue(evt.target.value);
            handleChange(evt.target.value);
          }}
        />
        <Button
          className="h-14"
          onClick={() => {
            handleChange(value);
          }}
        >
          重新生成
        </Button>
      </div>

      <Textarea
        label="格式化后的报文"
        placeholder="可根据原始报文自动生成"
        className="mt-4"
        value={formatValue}
        maxRows={10000}
        onChange={(evt) => {
          setFormatValue(evt.target.value);
        }}
      />

      <Button
        color="primary"
        className="mt-4 w-full"
        onClick={() => {
          copy();
        }}
      >
        生成原始报文格式并复制到粘贴板
      </Button>
    </div>
  );
};
