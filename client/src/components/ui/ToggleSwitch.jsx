export default function ToggleSwitch({
    checked,
    onChange,
}) {

    return (

        <button
            type="button"
            onClick={onChange}
            className={`relative h-7 w-14 rounded-full transition-all duration-300 ${
                checked
                    ? "bg-green-700"
                    : "bg-gray-300"
            }`}
        >

            <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all duration-300 ${
                    checked
                        ? "left-8"
                        : "left-1"
                }`}
            />

        </button>

    );

}