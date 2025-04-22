/* eslint-disable react/prop-types */
function InputTag({ type, placeholder, name, value, changeHandler }) {
  return (
    <div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={changeHandler}
        className="mx-[5%] w-[90%] rounded-md bg-[#faeeee] p-3 focus:outline-none dark:bg-[#202130]"
        placeholder={placeholder}
      />
    </div>
  );
}

export default InputTag;
