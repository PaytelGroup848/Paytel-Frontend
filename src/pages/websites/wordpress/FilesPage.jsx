import { useMemo, useState } from "react";
import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import {
  Folder,
  FileText,
  FolderPlus,
  FilePlus,
  Trash2,
  X,
  ArrowLeft,
  Upload,
  Package,
  Edit3,
  Eye,
  Save,
  SquarePen,
  Download,
  Scissors,
  ArchiveRestore,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  useGetFiles,
  useCreateFolder,
  useCreateFile,
  useDeleteItem,
  useUploadZip,
  useGetFileContent,
  useSaveFileContent,
  useRenameItem,
  useUploadFile,
  useMoveItem,
  useDownloadFile,
  useDownloadFolder,
  useDownloadHtdocs,
  useInstance,
  useDropAllTables,
} from "../../../hooks/useWordPress";

export default function FilesPage() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [pathState, setPathState] = useState(searchParams.get("path") || "");
  const navigate = useNavigate();

  // Modal states
  const [createFolderOpen, setCreateFolderOpen] = useState(false);
  const [createFileOpen, setCreateFileOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [inputName, setInputName] = useState("");
  const [uploadZipOpen, setUploadZipOpen] = useState(false);
  const [selectedZip, setSelectedZip] = useState(null);
  const [uploadFileOpen, setUploadFileOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Edit file states
  const [editingFile, setEditingFile] = useState(null);
  const [fileContent, setFileContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Rename states
  const [renameTarget, setRenameTarget] = useState(null);
  const [newName, setNewName] = useState("");

  const [moveMode, setMoveMode] = useState(false);
  const [moveSource, setMoveSource] = useState(null);

  const { data: files = [], isLoading, refetch } = useGetFiles(id, pathState);
  const { mutate: uploadZip, isPending: isUploading } = useUploadZip(id);
  const { mutate: uploadFile, isPending: isFileUploading } = useUploadFile(id);
  const { data: fileContentData, refetch: refetchContent } = useGetFileContent(
    id,
    editingFile?.path,
  );
  const { mutate: saveFileContent, isPending: isSaving } =
    useSaveFileContent(id);
  const { mutate: renameItem, isPending: isRenaming } = useRenameItem(id);
  const { mutate: moveItem, isPending: isMoving } = useMoveItem(id);
  const { mutate: downloadFile } = useDownloadFile(id);
  const { mutate: downloadFolder } = useDownloadFolder(id);
  const { mutate: downloadHtdocs, isPending: isDownloadingHtdocs } =
    useDownloadHtdocs(id);
  const { mutate: dropAllTables, isPending: isDroppingTables } =
    useDropAllTables(id);
  const { data: instance, isLoading: isLoadingInstance } = useInstance(id);
  const createFolder = useCreateFolder(id);
  const createFile = useCreateFile(id);
  const deleteItem = useDeleteItem(id);

  const isArchiveFile = (fileName) => {
    return (
      fileName.endsWith(".zip") ||
      fileName.endsWith(".tar.gz") ||
      fileName.endsWith(".tgz") ||
      fileName.endsWith(".tar") ||
      fileName.endsWith(".gz")
    );
  };

  const crumbs = useMemo(
    () => ["", ...pathState.split("/").filter(Boolean)],
    [pathState],
  );

  const goTo = (segments) => {
    const nextPath = segments.filter(Boolean).join("/");
    setPathState(nextPath);
    setSearchParams(nextPath ? { path: nextPath } : {});
  };

  const handleCut = (item) => {
    setMoveMode(true);
    setMoveSource(item);
    toast.success(
      `Cut: ${item.name}. Now navigate to destination and click "Paste Here"`,
    );
  };

  const handlePaste = () => {
    if (!moveSource) return;

    let destinationPath = pathState;
    if (destinationPath === moveSource.path.split("/").slice(0, -1).join("/")) {
      toast.error("Cannot move to same location");
      return;
    }

    moveItem(
      {
        sourcePath: moveSource.path,
        destinationPath: destinationPath
          ? `${destinationPath}/${moveSource.name}`
          : moveSource.name,
        isFolder: moveSource.type === "folder",
      },
      {
        onSuccess: () => {
          setMoveMode(false);
          setMoveSource(null);
        },
      },
    );
  };

  const cancelCut = () => {
    setMoveMode(false);
    setMoveSource(null);
    toast("Move cancelled");
  };

  const handleCreateFolder = () => {
    if (!inputName.trim()) return toast.error("Enter folder name");
    createFolder.mutate(
      { name: inputName.trim(), path: pathState },
      {
        onSuccess: () => {
          setCreateFolderOpen(false);
          setInputName("");
        },
      },
    );
  };

  const handleCreateFile = () => {
    if (!inputName.trim()) return toast.error("Enter file name");
    createFile.mutate(
      { name: inputName.trim(), path: pathState },
      {
        onSuccess: () => {
          setCreateFileOpen(false);
          setInputName("");
        },
      },
    );
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteItem.mutate(
      { name: deleteTarget.name, path: pathState },
      { onSuccess: () => setDeleteTarget(null) },
    );
  };

  const handleDropAllTables = () => {
    if (
      window.confirm(
        "WARNING: This will delete ALL WordPress tables!\n\nAll your posts, pages, users, and settings will be lost FOREVER.\n\nThis action CANNOT be undone!\n\nClick OK to confirm.",
      )
    ) {
      if (window.confirm("LAST WARNING: Are you ABSOLUTELY SURE?")) {
        dropAllTables();
      }
    }
  };

  const handleZipUpload = () => {
    if (!selectedZip) {
      toast.error("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("archiveFile", selectedZip); // Changed from zipFile to archiveFile
    formData.append("path", pathState);

    const loadingToast = toast.loading("Uploading and extracting archive...");

    uploadZip(formData, {
      onSuccess: () => {
        toast.dismiss(loadingToast);
        toast.success("Archive uploaded! Extraction in progress...");
        setTimeout(() => refetch(), 3000);
        setTimeout(() => refetch(), 7000);
        setUploadZipOpen(false);
        setSelectedZip(null);
      },
      onError: (error) => {
        toast.dismiss(loadingToast);
        toast.error(
          error?.response?.data?.message || "Failed to upload archive",
        );
      },
    });
  };

  const handleFileUpload = () => {
    if (!selectedFile) {
      toast.error("Please select a file");
      return;
    }

    console.log("Selected file:", selectedFile);
    console.log("File is File instance:", selectedFile instanceof File);
    console.log("File name:", selectedFile.name);

    // Create FormData
    const formData = new FormData();
    formData.append("file", selectedFile); // This should work
    formData.append("path", pathState || "");

    // Verify FormData has the file
    const fileFromFormData = formData.get("file");
    console.log("File from FormData:", fileFromFormData);
    console.log("File name from FormData:", fileFromFormData?.name);

    uploadFile(
      { file: selectedFile, path: pathState },
      {
        onSuccess: () => {
          setUploadFileOpen(false);
          setSelectedFile(null);
          refetch();
        },
        onError: (error) => {
          console.error("Upload error:", error);
          toast.error(
            error?.response?.data?.message || "Failed to upload file",
          );
        },
      },
    );
  };

  const handleViewFile = (file) => {
    let fullPath = file.path || file.name;

    if (file.path) {
      fullPath = file.path;
    } else if (pathState) {
      fullPath = `${pathState}/${file.name}`;
    } else {
      fullPath = file.name;
    }

    console.log("[handleViewFile] File:", file);
    console.log("[handleViewFile] Full path:", fullPath);

    setEditingFile({ ...file, path: fullPath });
    setIsEditing(false);
    // Refetch will happen automatically when editingFile changes
  };

  const handleDownloadFile = (item) => {
    console.log("Downloading item:", item);
    console.log("Item path:", item.path);
    console.log("Item type:", item.type);

    if (item.type === "folder") {
      downloadFolder({ folderPath: item.path });
    } else {
      downloadFile({ filePath: item.path });
    }
  };

  const handleEditFile = () => {
    setIsEditing(true);
  };

  const handleSaveContent = () => {
    saveFileContent(
      {
        filePath: editingFile.path,
        content: fileContent,
      },
      {
        onSuccess: () => {
          setIsEditing(false);
          setEditingFile(null);
          setFileContent("");
          refetch();
        },
      },
    );
  };

  const handleDownloadHtdocs = () => {
    const domain = instance?.domain || "website";
    downloadHtdocs(domain, {
      onSuccess: () => {
        toast.success(`Downloading ${domain}.zip started!`);
      },
    });
  };

  // Set content when loaded
  useMemo(() => {
    if (fileContentData?.content) {
      setFileContent(fileContentData.content);
    }
  }, [fileContentData]);

  // Rename handler
  const handleRename = () => {
    if (!renameTarget || !newName.trim()) return;

    console.log("Rename target:", renameTarget);
    console.log("Old path:", renameTarget.path);
    console.log("New name:", newName);
    console.log("Is folder:", renameTarget.type === "folder");

    renameItem(
      {
        oldPath: renameTarget.path, // This should be relative path like 'balaji.postservers.net'
        newName: newName.trim(),
        isFolder: renameTarget.type === "folder",
      },
      {
        onSuccess: () => {
          setRenameTarget(null);
          setNewName("");
          refetch();
          toast.success("Renamed successfully");
        },
        onError: (error) => {
          console.error("Rename error:", error);
          toast.error(error?.response?.data?.message || "Failed to rename");
        },
      },
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(`/wordpress/websitedashboard/${id}`)}
              className="flex items-center justify-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
            >
              <ArrowLeft size={17} />
              <span className="text-sm font-medium hidden sm:inline">Back</span>
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
              File Manager
            </h1>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Drop Database - Red button */}

            <button
              onClick={handleDropAllTables}
              disabled={isDroppingTables}
              className="flex items-center gap-2 px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-sm font-semibold transition-all shadow-sm"
              title="Drop All WordPress Tables"
            >
              {isDroppingTables ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Trash2 size={16} />
              )}
              <span className="hidden sm:inline">Drop Tables</span>
            </button>

            {/* Download Site */}
            {/* <button
              onClick={handleDownloadHtdocs}
              className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-semibold"
            >
              <Download size={16} />{" "}
              <span className="hidden sm:inline">Download Site</span>
            </button> */}

            {/* Upload File */}
            <button
              onClick={() => setUploadFileOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold"
            >
              <Upload size={16} />{" "}
              <span className="hidden sm:inline">Upload File</span>
            </button>

            {/* Upload ZIP */}
            <button
              onClick={() => setUploadZipOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold"
            >
              <Package size={16} />{" "}
              <span className="hidden sm:inline">Upload ZIP</span>
            </button>

            {/* New Folder */}
            <button
              onClick={() => {
                setCreateFolderOpen(true);
                setInputName("");
              }}
              className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold"
            >
              <FolderPlus size={16} />{" "}
              <span className="hidden sm:inline">New Folder</span>
            </button>

            {/* New File */}
            <button
              onClick={() => {
                setCreateFileOpen(true);
                setInputName("");
              }}
              className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-sm font-semibold"
            >
              <FilePlus size={16} />{" "}
              <span className="hidden sm:inline">New File</span>
            </button>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="mb-5 flex flex-wrap items-center gap-1.5 text-sm">
          {crumbs.map((crumb, idx) => (
            <button
              key={`${crumb}-${idx}`}
              onClick={() => goTo(crumbs.slice(1, idx + 1))}
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-indigo-50 hover:border-indigo-200 text-slate-600 hover:text-indigo-700 transition-all text-xs sm:text-sm"
            >
              {crumb || "root"}
            </button>
          ))}
        </div>

        {moveMode && (
          <div className="mb-5 flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5">
            <Scissors size={16} className="text-amber-600" />
            <span className="text-sm font-medium text-amber-800">
              Moving: <span className="font-bold">{moveSource?.name}</span>
            </span>
            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={handlePaste}
                disabled={isMoving}
                className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg transition-all disabled:opacity-50"
              >
                {isMoving ? "Moving..." : "Paste Here"}
              </button>
              <button
                onClick={cancelCut}
                className="px-3 py-1.5 border border-amber-300 text-amber-700 text-xs font-bold rounded-lg hover:bg-amber-100 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Desktop Table */}
        <div className="hidden md:block bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50/80">
              <tr>
                <th className="text-left px-5 py-3.5 font-semibold text-slate-600">
                  Name
                </th>
                <th className="text-left px-5 py-3.5 font-semibold text-slate-600">
                  Size
                </th>
                <th className="text-left px-5 py-3.5 font-semibold text-slate-600">
                  Type
                </th>
                <th className="text-left px-5 py-3.5 font-semibold text-slate-600">
                  Modified
                </th>
                <th className="text-left px-5 py-3.5 font-semibold text-slate-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    className="px-5 py-8 text-center text-slate-400"
                    colSpan={5}
                  >
                    Loading files...
                  </td>
                </tr>
              ) : files.length === 0 ? (
                <tr>
                  <td
                    className="px-5 py-8 text-center text-slate-400"
                    colSpan={5}
                  >
                    This folder is empty.
                  </td>
                </tr>
              ) : (
                files.map((item, index) => (
                  <tr
                    key={`${item.name}-${index}`}
                    className="group border-t border-slate-100 hover:bg-slate-50/60 transition-colors"
                  >
                    <td className="px-5 py-3">
                      <button
                        className="flex items-center gap-2.5 text-left w-full"
                        onClick={() => {
                          if (item.type === "folder")
                            goTo([
                              ...pathState.split("/").filter(Boolean),
                              item.name,
                            ]);
                          else handleViewFile(item);
                        }}
                      >
                        {item.type === "folder" ? (
                          <Folder size={16} className="text-amber-500" />
                        ) : (
                          <FileText size={16} className="text-blue-500" />
                        )}
                        <span className="text-slate-700 font-medium">
                          {item.name}
                        </span>
                      </button>
                    </td>
                    <td className="px-5 py-3 text-slate-500">
                      {item.size || "—"}
                    </td>
                    <td className="px-5 py-3">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 capitalize">
                        {item.type}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-slate-500 text-xs">
                      {item.modified || "—"}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        {/* View/Edit buttons for files */}
                        {item.type !== "folder" && (
                          <>
                            <button
                              onClick={() => handleViewFile(item)}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                              title="View"
                            >
                              <Eye size={14} />
                            </button>
                            <button
                              onClick={() => handleViewFile(item)}
                              className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg"
                              title="Edit"
                            >
                              <Edit3 size={14} />
                            </button>
                          </>
                        )}

                        {/* Download button for all files/folders */}
                        <button
                          onClick={() => handleDownloadFile(item)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                          title="Download"
                        >
                          <Download size={14} />
                        </button>

                        {/* Cut button */}
                        <button
                          onClick={() => handleCut(item)}
                          className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg"
                          title="Cut"
                        >
                          <Scissors size={14} />
                        </button>

                        {/* Rename button */}
                        <button
                          onClick={() => {
                            setRenameTarget(item);
                            setNewName(item.name);
                          }}
                          className="p-1.5 text-purple-600 hover:bg-purple-50 rounded-lg"
                          title="Rename"
                        >
                          <SquarePen size={14} />
                        </button>

                        {/* Delete button */}
                        <button
                          onClick={() => setDeleteTarget(item)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3">
          {isLoading ? (
            <div className="text-center py-10 text-slate-400 bg-white rounded-2xl border border-slate-200">
              Loading files...
            </div>
          ) : files.length === 0 ? (
            <div className="text-center py-10 text-slate-400 bg-white rounded-2xl border border-slate-200">
              This folder is empty.
            </div>
          ) : (
            files.map((item, index) => (
              <div
                key={`${item.name}-${index}`}
                className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <button
                    className="flex items-center gap-3 flex-1"
                    onClick={() => {
                      if (item.type === "folder")
                        goTo([
                          ...pathState.split("/").filter(Boolean),
                          item.name,
                        ]);
                      else handleViewFile(item);
                    }}
                  >
                    {item.type === "folder" ? (
                      <Folder size={20} className="text-amber-500" />
                    ) : (
                      <FileText size={20} className="text-blue-500" />
                    )}
                    <div className="truncate">
                      <p className="text-sm font-medium text-slate-800 truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-slate-400">
                        {item.size || "—"} · {item.modified || "—"}
                      </p>
                    </div>
                  </button>
                  <div className="flex items-center gap-1">
                    {item.type !== "folder" && (
                      <>
                        <button
                          onClick={() => handleViewFile(item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <Eye size={16} />
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => handleDownloadFile(item)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <Download size={16} />
                    </button>
                    <button
                      onClick={() => handleCut(item)}
                      className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg"
                    >
                      <Scissors size={16} />
                    </button>
                    <button
                      onClick={() => {
                        setRenameTarget(item);
                        setNewName(item.name);
                      }}
                      className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg"
                    >
                      <SquarePen size={16} />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(item)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Edit File Modal */}
      {editingFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-5 border-b">
              <div>
                <h3 className="font-bold text-slate-800">
                  {isEditing ? "Editing" : "Viewing"}: {editingFile.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {editingFile.path}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {!isEditing && editingFile.type !== "folder" && (
                  <button
                    onClick={handleEditFile}
                    className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2"
                  >
                    <Edit3 size={14} /> Edit
                  </button>
                )}
                {isEditing && (
                  <button
                    onClick={handleSaveContent}
                    disabled={isSaving}
                    className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
                  >
                    <Save size={14} /> {isSaving ? "Saving..." : "Save"}
                  </button>
                )}
                <button
                  onClick={() => {
                    setEditingFile(null);
                    setFileContent("");
                    setIsEditing(false);
                  }}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-lg"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto p-5">
              {isEditing ? (
                <textarea
                  value={fileContent}
                  onChange={(e) => setFileContent(e.target.value)}
                  className="w-full h-[500px] p-4 border rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="File content..."
                />
              ) : (
                <pre className="bg-slate-50 p-4 rounded-xl overflow-auto max-h-[500px] text-sm font-mono whitespace-pre-wrap">
                  {fileContent || "Loading content..."}
                </pre>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Rename Modal */}
      {renameTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2.5">
                <SquarePen size={20} className="text-amber-600" />
                Rename {renameTarget.type === "folder" ? "Folder" : "File"}
              </h3>
              <button
                onClick={() => setRenameTarget(null)}
                className="p-1.5 hover:bg-slate-100 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>
            <input
              autoFocus
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleRename()}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-5"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setRenameTarget(null)}
                className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleRename}
                disabled={isRenaming || !newName.trim()}
                className="flex-1 py-2.5 bg-amber-600 text-white rounded-xl text-sm font-semibold hover:bg-amber-700 disabled:opacity-50"
              >
                {isRenaming ? "Renaming..." : "Rename"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload File Modal */}
      {uploadFileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2.5">
                <Upload size={20} className="text-blue-600" />
                Upload File
              </h3>
              <button
                onClick={() => setUploadFileOpen(false)}
                className="p-1.5 hover:bg-slate-100 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-sm text-slate-500 mb-4">
              Upload to:{" "}
              <span className="font-mono text-xs bg-slate-100 p-1 rounded">
                /wp-content/uploads/{pathState}
              </span>
            </p>

            <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 mb-5 text-center hover:border-blue-300 transition-colors">
              <Upload size={32} className="mx-auto text-slate-400 mb-3" />
              <input
                type="file"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer inline-block px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors"
              >
                Choose File
              </label>
              {selectedFile && (
                <p className="mt-3 text-sm text-blue-600 font-medium">
                  Selected: {selectedFile.name}
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setUploadFileOpen(false)}
                className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleFileUpload}
                disabled={isFileUploading || !selectedFile}
                className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isFileUploading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Upload size={16} />
                )}
                {isFileUploading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload ZIP Modal */}
      {uploadZipOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2.5">
                <Package size={20} className="text-emerald-600" />
                Upload & Extract ZIP
              </h3>
              <button
                onClick={() => setUploadZipOpen(false)}
                className="p-1.5 hover:bg-slate-100 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-sm text-slate-500 mb-4">
              Upload to:{" "}
              <span className="font-mono text-xs bg-slate-100 p-1 rounded">
                /htdocs{pathState}
              </span>
            </p>

            <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 mb-5 text-center hover:border-emerald-300 transition-colors">
              <Package size={32} className="mx-auto text-slate-400 mb-3" />
              <input
                type="file"
                accept=".zip,.tar,.tar.gz,.tgz"
                onChange={(e) => setSelectedZip(e.target.files[0])}
                className="hidden"
                id="zip-upload"
              />
              <label
                htmlFor="zip-upload"
                className="cursor-pointer inline-block px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors"
              >
                Choose ZIP/TAR File
              </label>
              {selectedZip && (
                <p className="mt-3 text-sm text-emerald-600 font-medium">
                  Selected: {selectedZip.name}
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setUploadZipOpen(false)}
                className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleZipUpload}
                disabled={isUploading || !selectedZip}
                className="flex-1 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isUploading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Package size={16} />
                )}
                {isUploading ? "Extracting..." : "Upload & Extract"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Folder Modal */}
      {createFolderOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2.5">
                <FolderPlus size={20} className="text-indigo-600" />
                New Folder
              </h3>
              <button
                onClick={() => setCreateFolderOpen(false)}
                className="p-1.5 hover:bg-slate-100 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>
            <input
              autoFocus
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreateFolder()}
              placeholder="e.g. backups"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-5"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setCreateFolderOpen(false)}
                className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateFolder}
                disabled={createFolder.isPending}
                className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50"
              >
                {createFolder.isPending ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create File Modal */}
      {createFileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2.5">
                <FilePlus size={20} className="text-indigo-600" />
                New File
              </h3>
              <button
                onClick={() => setCreateFileOpen(false)}
                className="p-1.5 hover:bg-slate-100 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>
            <input
              autoFocus
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreateFile()}
              placeholder="e.g. notes.txt"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-5"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setCreateFileOpen(false)}
                className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateFile}
                disabled={createFile.isPending}
                className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50"
              >
                {createFile.isPending ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Trash2 size={24} className="text-red-500" />
            </div>
            <h3 className="font-semibold text-slate-800 text-center mb-1.5">
              Delete {deleteTarget.type === "folder" ? "Folder" : "File"}
            </h3>
            <p className="text-slate-500 text-sm text-center mb-6">
              <span className="font-medium text-slate-700">
                "{deleteTarget.name}"
              </span>{" "}
              will be permanently deleted.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteItem.isPending}
                className="flex-1 py-2.5 bg-red-500 text-white rounded-xl text-sm font-semibold hover:bg-red-600 disabled:opacity-50"
              >
                {deleteItem.isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
