"use client";

import React from "react";
import { Button } from "antd";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";

// #I宠物|冥炎之灵(鬼仙)$1$3#I#I宠物|孟姑(鬼仙)$1$3#I
// #I消费积分|消费积分#r10000#I

interface TableProps {
  columns: { label: string; key: string }[];
  rows: Record<string, string>[];
}

const renderResult = (result: string) => {
  const arr = result.split("\n");

  const newArr = arr.filter((i) => {
    return i !== "" && !i.startsWith("#");
  });

  const [dataIndex, ...dataSourceStringArr] = newArr;

  const dataIndexArr = dataIndex.split(",").map((i) => i.trim());

  const rows: Record<string, string>[] = [];

  dataSourceStringArr.forEach((i) => {
    const arr = i.split(", ");
    if (arr.length !== dataIndexArr.length) {
      return;
    }

    const obj: Record<string, string> = {};

    dataIndexArr.forEach((key, index) => {
      obj[key] = arr[index].trim();
    });
    rows.push(obj);
  });

  const columns = dataIndexArr.map((key) => {
    return { label: key, key };
  });

  return {
    columns,
    rows,
  };
};

const UploadButton: React.FC<{
  onChange?: (props: TableProps) => void;
}> = ({ onChange }) => {
  const ref = React.useRef<HTMLInputElement>(null);
  const [files, setFiles] = React.useState<File[]>([]);

  const renderFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target!.result as string;
      if (!result) {
        return;
      }

      onChange?.(renderResult(result));
    };
    reader.readAsText(file, "gb2312");
  };

  return (
    <>
      <input
        ref={ref}
        // value={files as string[]}
        title="up"
        className="display-none"
        type="file"
        onChange={(e) => {
          const file = e.target.files![0];

          if (!file) {
            return;
          }
          renderFile(file);
        }}
      />
      <Button type="primary">选择文件</Button>
    </>
  );
};

export const FestivalGiftItemTable: React.FC = () => {
  const [tableProps, setTableProps] = React.useState<TableProps>();

  return (
    <>
      <div className="mb-4">
        <UploadButton onChange={setTableProps} />
      </div>

      {/* {JSON.stringify(tableProps?.rows, null, 2)} */}

      {tableProps && (
        <Table>
          <TableHeader columns={tableProps.columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody
            items={tableProps.rows || ([] as Record<string, string>[])}
          >
            {(item) => (
              <TableRow key={item[tableProps.columns[0].key]}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </>
  );
};
