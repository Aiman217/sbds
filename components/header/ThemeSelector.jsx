import { useEffect } from "react";
import { themeChange } from "theme-change";

export default function ThemeSelector(props) {
  const themeList = ["Fantasy", "Dracula"];

  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <>
      <select
        data-choose-theme
        className={
          "select select-bordered text-base-content m-2 " + props.theme
        }
      >
        <option disabled>Pick your theme</option>
        <option value="">Default</option>
        {themeList?.map((item, index) => (
          <option
            key={index}
            value={item[0].toLowerCase() + item.slice(1)}
            className="capitalize"
          >
            {item}
          </option>
        ))}
      </select>
    </>
  );
}
