import collegeList from "src/assets/json/colleges.json"

export const findCollegeId = function (name) {
  const id = collegeList.find((item) => item.text === name)
  if (id) {
    return id.value
  }

  return null
}
