import { FiTrash2 } from "react-icons/fi";
export default function Specifications({
  state,
  dispatch,
}) {

  const addSpecification = () => {

    dispatch({
      type: "ADD_SPEC",
    });

  };

  return (

    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-xl font-bold">
          Specifications
        </h2>

        <button
          type="button"
          onClick={addSpecification}
          className="rounded-lg bg-green-700 px-4 py-2 text-white"
        >
          + Add
        </button>

      </div>
      {state.specifications.length === 0 && (

        <div className="rounded-xl border border-dashed p-8 text-center text-gray-500">

          No specifications added yet.

        </div>

      )}
      {state.specifications.map((spec, index) => (

        <div
          key={index}
          className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-[1fr_1fr_auto]"
        >

          <input
            placeholder="Key (e.g. Height)"
            value={spec.key}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_SPEC",
                index,
                field: "key",
                value: e.target.value,
              })
            }
            className="rounded-xl border p-3"
          />

          <input
            placeholder="Value (e.g. 2 ft)"
            value={spec.value}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_SPEC",
                index,
                field: "value",
                value: e.target.value,
              })
            }
            className="rounded-xl border p-3"
          />

          <button
            type="button"
            onClick={() =>
              dispatch({
                type: "REMOVE_SPEC",
                index,
              })
            }
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500 text-white transition hover:bg-red-600"
          >
            <FiTrash2 size={18} />
          </button>

        </div>

      ))}

    </div>

  );

}