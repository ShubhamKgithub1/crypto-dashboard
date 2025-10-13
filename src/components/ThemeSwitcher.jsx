import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/themeSlice";
import { Moon, Sun } from "lucide-react";

const ThemeSwitcher = ()=>{
    const dispatch = useDispatch();
    const themeMode = useSelector((state)=>state.theme.mode);
    const handleToggle =()=>{
        dispatch(toggleTheme());
    };
    return (
        <div className="dark:bg-white text-white dark:text-slate-600 rounded-full shadow bg-slate-700 p-3 cursor-pointer transition-all duration-200" onClick={handleToggle}>
            {themeMode === "light"?<Moon/>:<Sun/>}
        </div>
    )
};

export default ThemeSwitcher;