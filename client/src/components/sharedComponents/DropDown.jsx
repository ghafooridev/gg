import React, { useEffect, useState } from "react"

import PropTypes from "prop-types"

import {
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  ListGroup,
  ListGroupItem,
} from "reactstrap"

const DropDown = function (props) {
  const { label, placeholder, name, option, onSelect } = props
  const [list, setList] = useState(option)
  const [selectedData, setSelectedData] = useState("")
  const [show, setShow] = useState(false)

  const onChangeText = function (event) {
    const { value } = event.target

    if (value) {
      const filteredList = option.filter((item) =>
        item.value.startsWith(value.toLowerCase())
      )
      setShow(true)
      setSelectedData(value)
      return setList(filteredList)
    }

    return setList(option)
  }

  const onDropDownSelect = function (item) {
    setSelectedData(item)
    setShow(false)
  }

  const onPressEnter = function (event) {
    if (event.which === 13 && list.length) {
      setSelectedData(list[0])
      setShow(false)
    }
  }

  const onClickIcon = function () {
    setShow(!show)
  }

  useEffect(() => {
    if (selectedData.id) {
      onSelect({ name, value: selectedData.id })
    }
  }, [name, onSelect, selectedData])

  return (
    <>
      <label>{label}</label>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i
              className={
                show ? "nc-icon nc-minimal-up" : "nc-icon nc-minimal-down"
              }
              onClick={onClickIcon}
            />
          </InputGroupText>
        </InputGroupAddon>
        <Input
          placeholder={placeholder}
          type="text"
          value={selectedData.value}
          onChange={onChangeText}
          onKeyPress={onPressEnter}
        />
      </InputGroup>
      <ListGroup>
        {show &&
          list.map((item, index) => {
            return (
              <ListGroupItem
                style={{ cursor: "pointer" }}
                key={index}
                onClick={() => onDropDownSelect(item)}
              >
                {item.value}
              </ListGroupItem>
            )
          })}
      </ListGroup>
    </>
  )
}

DropDown.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  option: PropTypes.array,
  onSelect: PropTypes.func,
}

export default DropDown
