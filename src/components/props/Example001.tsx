import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import {
  MenuItem,
  FormControlLabel,
  Checkbox,
  Divider,
  Fab,
  Button,
  Tooltip,
  IconButton
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import _ from "lodash";
import { v4 } from "uuid";

const currencies = [
  {
    value: "001",
    label: "親1"
  },
  {
    value: "001_1",
    label: "子1"
  },
  {
    value: "001_2",
    label: "子2"
  },
  {
    value: "001_3",
    label: "子3"
  }
];

const initialData = {
  resultVariableName: "in1",
  param: "$I.card",
  code: "001",
  isArray: true,
  children: [
    {
      code: "001_1",
      param: "$I.card02",
      isArray: true
    },
    {
      code: "001_2",
      param: "$I.card03",
      isArray: true
    }
  ]
};

interface IData {
  code: string;
  param: string;
  isArray: boolean;
}

interface IBindEditorProps {
  data: IData;
  index: number;
  onDataChange: Function;
  onDataDelete: Function;
}

/**
 *
 * @param data
 */
const BindEditor = ({
  data,
  index,
  onDataChange,
  onDataDelete
}: IBindEditorProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        {index}
        <IconButton
          size="small"
          onClick={event => {
            onDataDelete();
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </div>
      <TextField
        label="param"
        variant="filled"
        defaultValue={data.param}
        onChange={event => {
          let renewData: IData = {
            code: data.code,
            isArray: data.isArray,
            param: event.target.value
          };
          onDataChange(renewData);
        }}
        style={{ margin: 10 }}
      />
      <TextField
        select
        label="code"
        variant="filled"
        defaultValue={data.code}
        onChange={event => {
          let renewData: IData = {
            code: event.target.value,
            isArray: data.isArray,
            param: data.param
          };
          onDataChange(renewData);
        }}
        style={{ margin: 10 }}
      >
        {currencies.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <FormControlLabel
        style={{ margin: 10 }}
        control={
          <Checkbox
            checked={data.isArray}
            onChange={event => {
              let renewData: IData = {
                code: data.code,
                isArray: event.target.checked,
                param: data.param
              };
              onDataChange(renewData);
            }}
            value="isArray"
            color="primary"
          />
        }
        label="配列として扱う"
      />
    </div>
  );
};

export const Example001 = () => {
  const [code, setCode] = useState(initialData.code);
  const [param, setParam] = useState(initialData.param);
  const [isArray, setIsArray] = useState(initialData.isArray);
  const [resultVariableName, setResultVariableName] = useState(
    initialData.resultVariableName
  );
  const [children, setChildren] = useState(initialData.children);

  useEffect(() => {
    console.log("useEffect -- parent");
    console.log(resultVariableName);
    console.log(code);
    console.log(param);
    console.log(isArray);
    console.log(children);
  });

  return (
    <div key="parent" style={{ position: "absolute", right: 0, width: 300 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <TextField
          label="Result Variable Name"
          variant="filled"
          value={resultVariableName}
          onChange={event => {
            setResultVariableName(event.target.value);
          }}
          style={{ margin: 10 }}
        />
        <TextField
          label="param"
          variant="filled"
          value={param}
          onChange={event => {
            setParam(event.target.value);
          }}
          style={{ margin: 10 }}
        />
        <TextField
          select
          label="code"
          variant="filled"
          value={code}
          onChange={event => {
            setCode(event.target.value);
          }}
          style={{ margin: 10 }}
        >
          {currencies.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <FormControlLabel
          style={{ margin: 10 }}
          control={
            <Checkbox
              checked={isArray}
              onChange={event => {
                setIsArray(event.target.checked);
              }}
              value="isArray"
              color="primary"
            />
          }
          label="配列として扱う"
        />
      </div>

      <div style={{ margin: 10 }}>Children</div>
      {children.map((childData, i) => (
        <>
          <Divider />
          <BindEditor
            key={v4()}
            data={childData}
            index={i}
            onDataDelete={() => {
              if (!window.confirm(`${i}を消します。`)) {
                return;
              }
              let clonedChildren = _.cloneDeep(children);
              clonedChildren = clonedChildren.filter((child, idx) => idx !== i);
              setChildren(clonedChildren);
            }}
            onDataChange={(data: IData) => {
              let clonedChildren = _.cloneDeep(children);
              clonedChildren[i] = data;
              setChildren(clonedChildren);
            }}
          />
        </>
      ))}

      <Divider />

      <Fab
        size="small"
        color="primary"
        style={{
          bottom: 10,
          right: 20,
          position: "fixed"
        }}
        onClick={event => {
          setChildren(
            children.concat({
              code: "",
              param: "",
              isArray: true
            })
          );
        }}
      >
        <Tooltip title="子を追加する">
          <AddIcon />
        </Tooltip>
      </Fab>

      <div style={{ margin: 10, marginBottom: 20 }}>
        {children && children.length > 0  && (
        <Button
          variant="contained"
          size="small"
          color="secondary"
          onClick={() => {
            setChildren([]);
          }}
        >
          All Delete
        </Button>
        )}

        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={() => {
            console.log(resultVariableName);
            console.log(code);
            console.log(param);
            console.log(isArray);
            console.log(children);
          }}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};
