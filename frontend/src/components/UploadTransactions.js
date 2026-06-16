import { useState } from "react";

function UploadTransactions({ apiClient, onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [uploadedCount, setUploadedCount] = useState(0);

  const validateFile = (value) => {
    if (!value) {
      return "Please select a CSV file to upload.";
    }
    if (!value.name.toLowerCase().endsWith(".csv")) {
      return "Only CSV files are supported.";
    }
    return null;
  };

  const handleFileChange = (event) => {
    const nextFile = event.target.files?.[0] ?? null;
    setFile(nextFile);
    setError(null);
    setMessage("");
    setStatus(null);
    setProgress(0);
    setUploadedCount(0);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      setStatus("error");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setStatus("uploading");
      setError(null);
      setMessage("");
      setProgress(0);
      setUploadedCount(0);

      const response = await apiClient.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (event) => {
          if (event.total) {
            setProgress(Math.round((event.loaded * 100) / event.total));
          }
        },
      });

      setStatus("success");
      setMessage(response.data.message || "Upload completed successfully.");
      setUploadedCount(response.data.transactions?.length ?? 0);
      setProgress(100);
      onUploadSuccess?.();
    } catch (uploadError) {
      setStatus("error");
      setMessage("");
      setUploadedCount(0);
      setProgress(0);
      setError(
        uploadError.response?.data?.detail ||
          uploadError.message ||
          "Upload failed."
      );
    }
  };

  return (
    <section className="rounded-[32px] border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/20">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white">Upload Transactions</h2>
        <p className="text-sm text-slate-400">Upload a CSV file to refresh your analytics automatically.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
          <label className="block text-sm font-semibold text-slate-200">
            Select CSV file
          </label>
          <input
            type="file"
            accept=".csv,text/csv"
            onChange={handleFileChange}
            className="mt-3 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sky-500"
          />
          <p className="mt-3 text-sm text-slate-400">
            Required columns: Date, Description, Amount, Transaction Type, Category.
          </p>
        </div>

        {status === "uploading" && (
          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-4">
            <p className="text-sm text-slate-300">Upload progress</p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-sky-500 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-2 text-sm text-slate-400">{progress}% complete</p>
          </div>
        )}

        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-3xl bg-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
        >
          Upload and Refresh
        </button>

        {message && (
          <div className="rounded-3xl border border-emerald-500 bg-emerald-950/20 p-4 text-sm text-emerald-200">
            <p>{message}</p>
            {uploadedCount > 0 && (
              <p className="mt-2 text-slate-300">Parsed {uploadedCount} transactions successfully.</p>
            )}
          </div>
        )}

        {error && (
          <div className="rounded-3xl border border-rose-500 bg-rose-950/20 p-4 text-sm text-rose-200">
            <p>{error}</p>
          </div>
        )}
      </form>
    </section>
  );
}

export default UploadTransactions;
