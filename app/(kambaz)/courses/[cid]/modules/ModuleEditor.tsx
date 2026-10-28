"use client";

export default function ModuleEditor({
  show,
  handleCloseAction: handleClose,
  dialogTitle,
  moduleName,
  setModuleNameAction: setModuleName,
  addModuleAction: addModule,
}: {
  show: boolean;
  handleCloseAction: () => void;
  dialogTitle: string;
  moduleName: string;
  setModuleNameAction: (name: string) => void;
  addModuleAction: () => void;
}) {
  if (!show) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      id="wd-add-module-dialog"
    >
      <div className="w-full max-w-md rounded-lg bg-white shadow-lg">
        <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
          <h3 className="m-0 text-lg font-semibold">{dialogTitle}</h3>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="reset-default block bg-inherit center text-base border-none"
          >
            X
          </button>
        </div>
        <div className="px-4 py-3">
          <input
            className="w-full rounded border border-neutral-300 px-3 py-1.5"
            value={moduleName}
            placeholder="Module name"
            onChange={(e) => setModuleName(e.target.value)}
            id="wd-add-module-name"
          />
        </div>
        <div className="flex justify-end gap-2 border-t border-neutral-200 px-4 py-3">
          <button
            type="button"
            onClick={handleClose}
            id="wd-add-module-cancel"
            className="reset-default block px-2 py-1 rounded bg-gray-200 border-none text-base"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              addModule();
              handleClose();
            }}
            id="wd-add-module-submit"
            className="reset-default block px-2 py-1 rounded bg-red-700 text-white border-none text-base"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
