"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Comic, Chapter, ComicPage, Contributor, Discount } from "@/types/comic";
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import { User as UserIcon, Plus, Trash2, Edit2, Settings, Check, X, GripVertical } from 'lucide-react';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '@/lib/firebase';
import Image from 'next/image';
import { Switch } from '@/components/ui/switch';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import type { DraggableProvided, DraggableStateSnapshot, DroppableProvided } from 'react-beautiful-dnd';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import dayjs from 'dayjs';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import imageCompression from 'browser-image-compression';

// Tambahkan deklarasi fungsi generateId di atas semua pemanggilannya
const generateId = () => (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `id${Date.now()}`);

const uploadIntro = (
  <div className="flex flex-col md:flex-row items-center justify-center gap-8">
    <Image
      src="/thamrin.png"
      alt="Ilustrasi Upload Komik"
      width={256}
      height={256}
      className="w-40 md:w-64 mb-4 md:mb-0 rounded-xl shadow"
      style={{ objectFit: "contain", width: "auto" }}
      priority
    />
    <div className="bg-white/90 border border-gray-200 rounded-2xl shadow-md p-6 sm:p-8 max-w-2xl w-full">
      <h2 className="text-xl font-bold mb-3 text-primary">Ayo Upload Komikmu dan Raih Keuntungan!</h2>
      <ul className="list-disc ml-6 mb-4 text-base text-gray-700 space-y-1">
        <li>Bagikan karya komikmu ke ribuan pembaca di seluruh Indonesia.</li>
        <li>Dapatkan penghasilan dari setiap halaman komik yang dibaca atau dibeli.</li>
        <li>Promosikan dirimu sebagai kreator dan bangun komunitas penggemar.</li>
      </ul>
      <div className="font-semibold mb-2 text-gray-800">Syarat & Ketentuan Upload Komik:</div>
      <ol className="list-decimal ml-6 text-sm text-gray-600 space-y-1">
        <li>Karya komik harus orisinal dan tidak melanggar hak cipta pihak lain.</li>
        <li>Konten tidak mengandung unsur SARA, pornografi, atau kekerasan berlebihan.</li>
        <li>Komik yang diupload akan melalui proses review sebelum dipublikasikan.</li>
        <li>Penjualan komik tunduk pada aturan dan pembagian hasil platform.</li>
        <li>Dengan mengupload, Anda setuju dengan <a href="/terms" className="underline text-primary" target="_blank">Syarat & Ketentuan Platform</a>.</li>
      </ol>
    </div>
  </div>
);

// Modal reusable dengan animasi
function Modal({ open, onClose, title, children }: { open: boolean, onClose: () => void, title?: string, children: React.ReactNode }) {
  React.useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-fadeIn" onClick={onClose}>
      <div
        className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl relative animate-modalIn"
        onClick={e => e.stopPropagation()}
      >
        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={onClose}>&times;</button>
        {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
        <div className="flex flex-col gap-4 w-full">
          {children}
        </div>
      </div>
    </div>
  );
}

const storage = getStorage(app);

// Tambahkan state edit untuk field baru
type EditFields = {
  genre: string;
  category: string;
  tags: string;
  language: string;
  audience: string;
  authorAlias: string;
  authorBioUrl: string;
  status: '' | 'draft' | 'published' | 'review';
  year: string;
  localLanguage?: string;
};

// Tambahkan daftar genre
const genreOptions = [
  { value: "aksi", label: "Aksi" },
  { value: "romantis", label: "Romantis" },
  { value: "komedi", label: "Komedi" },
  { value: "drama", label: "Drama" },
  { value: "horor", label: "Horor" },
  { value: "fantasi", label: "Fantasi" },
  { value: "petualangan", label: "Petualangan" },
  { value: "slice-of-life", label: "Slice of Life" },
  { value: "misteri", label: "Misteri" },
  { value: "sains-fiksi", label: "Sains Fiksi" },
  { value: "pendidikan", label: "Pendidikan" },
  { value: "religi", label: "Religi" },
  { value: "lainnya", label: "Lainnya" },
];

function SortablePage({ page, children }: { page: ComicPage, children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: page.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 99 : 'auto',
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="relative">
      {children}
    </div>
  );
}

function SortableChapter({ chapter, children }: { chapter: Chapter, children: (props: { attributes: any, listeners: any, setNodeRef: any, style: any }) => React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: chapter.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 99 : 'auto',
  };
  return (
    <div ref={setNodeRef} style={style}>
      {children({ attributes, listeners, setNodeRef, style })}
    </div>
  );
}

export default function UploadKomikForm() {
  // Semua useState di paling atas!
  const [hasMounted, setHasMounted] = useState(false);
  const [comics, setComics] = useState<Comic[]>([]);
  const [selectedComicId, setSelectedComicId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newCover, setNewCover] = useState<string | null>(null);
  const [newCoverFile, setNewCoverFile] = useState<File | null>(null);
  const [newChapterTitle, setNewChapterTitle] = useState("");
  const [newChapterPricePerPage, setNewChapterPricePerPage] = useState(0);
  const [newChapterBundlePrice, setNewChapterBundlePrice] = useState(0);
  const [newPageFile, setNewPageFile] = useState<File | null>(null);
  const [newPagePreview, setNewPagePreview] = useState<string | null>(null);
  const [newPageIsPaid, setNewPageIsPaid] = useState(false);
  const [newPageOrder, setNewPageOrder] = useState(0);
  const [activeTab, setActiveTab] = useState("pengantar");
  const [pendapatan, setPendapatan] = useState<any>(null);
  const [analytik, setAnalytik] = useState<any>(null);
  const [selectedChapterIdForPage, setSelectedChapterIdForPage] = useState<string | null>(null);
  const [editingChapterId, setEditingChapterId] = useState<string | null>(null);
  const [editingChapterTitle, setEditingChapterTitle] = useState("");
  const [addingChapter, setAddingChapter] = useState(false);
  const [addingChapterTitle, setAddingChapterTitle] = useState("");
  const [showAddComicModal, setShowAddComicModal] = useState(false);
  const [showAddChapterModal, setShowAddChapterModal] = useState(false);
  const [showAddPageModal, setShowAddPageModal] = useState(false);
  const [modalChapterParentId, setModalChapterParentId] = useState<string | null>(null);
  const [modalPageParentId, setModalPageParentId] = useState<string | null>(null);
  const { user, loading } = useAuth();
  const [comicError, setComicError] = useState("");
  const [chapterError, setChapterError] = useState("");
  const [pageError, setPageError] = useState("");
  const [newGenres, setNewGenres] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [newTags, setNewTags] = useState("");
  const [newLanguage, setNewLanguage] = useState("");
  const [newLocalLanguage, setNewLocalLanguage] = useState("");
  const [newAudience, setNewAudience] = useState("");
  const [newAuthorAlias, setNewAuthorAlias] = useState(user?.displayName || user?.email || "");
  const [newAuthorBioUrl, setNewAuthorBioUrl] = useState("");
  const [newStatus, setNewStatus] = useState<'' | 'draft' | 'published' | 'review'>('');
  const [newYear, setNewYear] = useState("");
  const [isDraggingPage, setIsDraggingPage] = useState(false);
  const [editComic, setEditComic] = useState<Comic | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editCover, setEditCover] = useState<string | null>(null);
  const [editCoverFile, setEditCoverFile] = useState<File | null>(null);
  const [editFields, setEditFields] = useState<EditFields>({
    genre: "",
    category: "",
    tags: "",
    language: "",
    audience: "",
    authorAlias: "",
    authorBioUrl: "",
    status: '',
    year: "",
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteComicId, setDeleteComicId] = useState<string | null>(null);
  const [deleteChapterId, setDeleteChapterId] = useState<string | null>(null);
  const [deletePageInfo, setDeletePageInfo] = useState<{ chapterId: string, pageId: string } | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showEditChapterModal, setShowEditChapterModal] = useState(false);
  const [showDeleteChapterConfirm, setShowDeleteChapterConfirm] = useState(false);
  const [showDeletePageConfirm, setShowDeletePageConfirm] = useState(false);
  const [comicToSubmit, setComicToSubmit] = useState<string | null>(null);
  const [submitNotes, setSubmitNotes] = useState("");
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [editChapter, setEditChapter] = useState<Chapter | null>(null);
  const [editChapterTitle, setEditChapterTitle] = useState("");
  const [editChapterPricePerPage, setEditChapterPricePerPage] = useState(0);
  const [editChapterBundlePrice, setEditChapterBundlePrice] = useState(0);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [chapterAnalytics, setChapterAnalytics] = useState<any[]>([]);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [withdrawMethod, setWithdrawMethod] = useState('OVO');
  const [withdrawNumber, setWithdrawNumber] = useState('');
  const [withdrawError, setWithdrawError] = useState('');
  const [withdrawSuccess, setWithdrawSuccess] = useState('');
  const [diamondEarned, setDiamondEarned] = useState<{
    totalReads: number;
    diamondEarned: number;
    newDiamondBalance: number;
  } | null>(null);
  const [purchases, setPurchases] = useState<any[]>([]);
  const [loadingPurchases, setLoadingPurchases] = useState(false);
  const [allPurchases, setAllPurchases] = useState<{ [comicId: string]: any[] }>({});
  const [isCompressingPage, setIsCompressingPage] = useState(false);

  // Baru setelah semua useState, panggil hook lain
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));
  useEffect(() => { setHasMounted(true); }, []);

  const sortedPagesPerChapter = useMemo(() => {
    const map: Record<string, ComicPage[]> = {};
    comics.forEach(comic => {
      comic.chapters.forEach(chapter => {
        map[chapter.id] = chapter.pages.slice().sort((a, b) => (a.order || 0) - (b.order || 0));
      });
    });
    return map;
  }, [comics]);

  // Komik yang sedang diedit
  const selectedComic = comics.find(c => c.id === selectedComicId) || null;

  // Fetch data komik dari server
  useEffect(() => {
    if (!user) return;
    const fetchComics = async () => {
      try {
        const response = await fetch(`/api/comics?authorId=${user.uid}`);
        if (response.ok) {
          const data = await response.json();
          setComics(data);
        } else {
          console.error('Failed to fetch comics');
        }
      } catch (error) {
        console.error('Error fetching comics:', error);
      }
    };
    fetchComics();
  }, [user]);

  // Fetch data pendapatan dan analytik dari server
  useEffect(() => {
    const fetchPendapatan = async () => {
      if (!selectedComicId) return;
      try {
        const response = await fetch(`/api/comics/${selectedComicId}/pendapatan`);
        if (response.ok) {
          const data = await response.json();
          setPendapatan(data);
        } else {
          console.error('Failed to fetch pendapatan');
        }
      } catch (error) {
        console.error('Error fetching pendapatan:', error);
      }
    };
    const fetchAnalytik = async () => {
      if (!selectedComicId) return;
      try {
        const response = await fetch(`/api/comics/${selectedComicId}/analytik`);
        if (response.ok) {
          const data = await response.json();
          setAnalytik(data);
        } else {
          console.error('Failed to fetch analytik');
        }
      } catch (error) {
        console.error('Error fetching analytik:', error);
      }
    };
    fetchPendapatan();
    fetchAnalytik();
  }, [selectedComicId]);

  useEffect(() => {
    if (!user) return;
    fetch(`/api/comics/analytics?userId=${user.uid}`)
      .then(res => res.json())
      .then(setChapterAnalytics);
  }, [user]);

  // Fetch diamond earned
  useEffect(() => {
    const fetchDiamondEarned = async () => {
      if (!selectedComicId || !user) return;
      try {
        const response = await fetch(`/api/comics/${selectedComicId}/purchases?creatorId=${user.uid}`);
        if (response.ok) {
          const data = await response.json();
          setDiamondEarned(data);
        }
      } catch (error) {
        console.error('Error fetching diamond earned:', error);
      }
    };
    fetchDiamondEarned();
  }, [selectedComicId, user]);

  // Fetch purchases langsung dari Firestore
  useEffect(() => {
    if (!selectedComicId) return;
    setLoadingPurchases(true);
    const fetchPurchases = async () => {
      try {
        const db = getFirestore(app);
        const snap = await getDocs(collection(db, `komik/${selectedComicId}/purchases`));
        setPurchases(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        setPurchases([]);
      } finally {
        setLoadingPurchases(false);
      }
    };
    fetchPurchases();
  }, [selectedComicId]);

  // Agregasi pembelian per chapter
  const pembelianPerChapter = useMemo(() => {
    const map: Record<string, number> = {};
    purchases.forEach(p => {
      const chapterId = p.chapterId || "unknown";
      map[chapterId] = (map[chapterId] || 0) + 1;
    });
    return map;
  }, [purchases]);

  // Agregasi pembelian per chapter untuk semua komik (untuk tab Analytik)
  const pembelianPerChapterMap = useMemo(() => {
    const result: { [comicId: string]: Record<string, number> } = {};
    Object.entries(allPurchases).forEach(([comicId, purchases]) => {
      const map: Record<string, number> = {};
      purchases.forEach((p: any) => {
        const chapterId = p.chapterId || "unknown";
        map[chapterId] = (map[chapterId] || 0) + 1;
      });
      result[comicId] = map;
    });
    return result;
  }, [allPurchases]);

  // Handler untuk cover baru
  const handleNewCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Compress image before preview/upload
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1600,
        useWebWorker: true,
        initialQuality: 0.7,
      });
      setNewCoverFile(compressedFile);
      if (hasMounted) {
        setNewCover(URL.createObjectURL(compressedFile));
      }
    }
  };

  // Handler tambah komik baru
  const handleAddComic = async () => {
    if (!newTitle || !user) return;
    const komikId = generateId();
    let coverUrl = '';
    
    try {
      // Upload cover image first if exists
      if (newCoverFile) {
        const coverStorageRef = storageRef(storage, `komik/${user.uid}/${komikId}/coverimage`);
        await uploadBytes(coverStorageRef, newCoverFile);
        coverUrl = await getDownloadURL(coverStorageRef);
      }

      // Create new comic object with the cover URL
      const allowedStatus = ['draft', 'published', 'review'];
      const statusToSave = allowedStatus.includes(newStatus) ? newStatus : 'draft';
      const now = new Date().toISOString();
      const newComic: Comic = {
        id: komikId,
        title: newTitle,
        synopsis: newDescription,
        cover: coverUrl,
        coverUrl: coverUrl,
        authorId: user.uid,
        contributors: [],
        chapters: [],
        createdAt: now,
        updatedAt: now,
        genre: newGenres.join(','),
        category: newCategory,
        tags: newTags.split(',').map(t => t.trim()).filter(Boolean),
        language: newLanguage,
        audience: newAudience,
        authorAlias: newAuthorAlias,
        authorBioUrl: newAuthorBioUrl,
        status: statusToSave as 'draft' | 'published' | 'review',
        year: newYear,
      };

      // Save to Firestore
      const response = await fetch('/api/comics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComic),
      });

      if (response.ok) {
        setComics([newComic, ...comics]);
        setSelectedComicId(newComic.id);
        setNewTitle("");
        setNewDescription("");
        setNewCover(null);
        setNewCoverFile(null);
        toast.success('Komik berhasil ditambahkan!');
      } else {
        console.error('Failed to add comic');
        toast.error('Gagal menambahkan komik');
      }
    } catch (error) {
      console.error('Error adding comic:', error);
      toast.error('Terjadi kesalahan saat menambahkan komik');
    }
  };

  // Handler tambah chapter baru
  const handleAddChapter = async () => {
    if (!selectedComicId || !newChapterTitle) return;
    const now = new Date().toISOString();
    const newChapter: Chapter = {
      id: generateId(),
      title: newChapterTitle,
      pages: [],
      pricePerPage: newChapterPricePerPage,
      bundlePrice: newChapterBundlePrice,
      createdAt: now,
      updatedAt: now,
    };
    try {
      const response = await fetch(`/api/comics/${selectedComicId}/chapters`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newChapter),
      });
      if (response.ok) {
        setComics(comics.map(comic => 
          comic.id === selectedComicId 
            ? { ...comic, chapters: [...comic.chapters, newChapter] } 
            : comic
        ));
        setNewChapterTitle("");
        setNewChapterPricePerPage(0);
        setNewChapterBundlePrice(0);
      } else {
        console.error('Failed to add chapter');
      }
    } catch (error) {
      console.error('Error adding chapter:', error);
    }
  };

  // Handler untuk halaman baru
  const handleNewPageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsCompressingPage(true);
      // Compress image before preview/upload
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1600,
        useWebWorker: true,
        initialQuality: 0.7,
      });
      setNewPageFile(compressedFile);
      if (hasMounted) {
        setNewPagePreview(URL.createObjectURL(compressedFile));
      }
      setIsCompressingPage(false);
    }
  };

  // Handler tambah halaman baru
  const handleAddPage = async (chapterId: string) => {
    if (isDraggingPage) return; // Cegah tambah saat drag
    if (!selectedComicId || !newPageFile || !user) return;
    let pageUrl = '';
    const chapterFolder = `komik/${user.uid}/${selectedComicId}/${chapterId}`;
    const pageStorageRef = storageRef(storage, `${chapterFolder}/${newPageFile.name}`);
    await uploadBytes(pageStorageRef, newPageFile);
    pageUrl = await getDownloadURL(pageStorageRef);
    const newPage: ComicPage = {
      id: generateId(), // Gunakan generateId agar unik
      imageUrl: pageUrl,
      isPaid: newPageIsPaid,
      order: newPageOrder,
    };
    try {
      const response = await fetch(`/api/comics/${selectedComicId}/chapters/${chapterId}/pages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPage),
      });
      if (response.ok) {
        setComics(comics.map(comic =>
          comic.id === selectedComicId
            ? {
                ...comic,
                chapters: comic.chapters.map(ch =>
                  ch.id === chapterId
                    ? { ...ch, pages: [...ch.pages, newPage] }
                    : ch
                )
              }
            : comic
        ));
        setNewPageFile(null);
        setNewPagePreview(null);
        setNewPageIsPaid(false);
        setNewPageOrder(0);
      } else {
        console.error('Failed to add page');
      }
    } catch (error) {
      console.error('Error adding page:', error);
    }
  };

  // Handler tambah chapter inline
  const handleAddChapterInline = async () => {
    if (!selectedComicId || !addingChapterTitle.trim()) return;
    const now = new Date().toISOString();
    const newChapter: Chapter = {
      id: generateId(),
      title: addingChapterTitle,
      pages: [],
      pricePerPage: 0,
      bundlePrice: 0,
      createdAt: now,
      updatedAt: now,
    };
    try {
      const response = await fetch(`/api/comics/${selectedComicId}/chapters`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newChapter),
      });
      if (response.ok) {
        setComics(comics.map(comic =>
          comic.id === selectedComicId
            ? { ...comic, chapters: [...comic.chapters, newChapter] }
            : comic
        ));
        setAddingChapter(false);
        setAddingChapterTitle("");
        toast.success('Chapter berhasil ditambah!');
      } else {
        toast.error('Gagal menambah chapter');
      }
    } catch (error) {
      toast.error('Error menambah chapter');
    }
  };

  // Handler edit chapter inline
  const handleEditChapterInline = async (chapterId: string) => {
    if (!selectedComicId || !editingChapterTitle.trim()) return;
    // Simulasi update lokal (karena belum ada endpoint PUT/PATCH)
    setComics(comics.map(comic =>
      comic.id === selectedComicId
        ? {
            ...comic,
            chapters: comic.chapters.map(ch =>
              ch.id === chapterId ? { ...ch, title: editingChapterTitle } : ch
            ),
          }
        : comic
    ));
    setEditingChapterId(null);
    setEditingChapterTitle("");
    toast.success('Chapter berhasil diubah!');
  };

  // Handler keydown untuk inline add/edit
  const handleChapterInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, mode: 'add' | 'edit', chapterId?: string) => {
    if (e.key === 'Enter') {
      if (mode === 'add') handleAddChapterInline();
      if (mode === 'edit' && chapterId) handleEditChapterInline(chapterId);
    } else if (e.key === 'Escape') {
      if (mode === 'add') {
        setAddingChapter(false);
        setAddingChapterTitle("");
      }
      if (mode === 'edit') {
        setEditingChapterId(null);
        setEditingChapterTitle("");
      }
    }
  };

  // Handler open modal
  const openAddComicModal = () => setShowAddComicModal(true);
  const openAddChapterModal = (comicId: string) => { setModalChapterParentId(comicId); setShowAddChapterModal(true); };
  const openAddPageModal = (chapterId: string) => { setModalPageParentId(chapterId); setShowAddPageModal(true); };
  // Handler close modal
  const closeAddComicModal = () => setShowAddComicModal(false);
  const closeAddChapterModal = () => { setShowAddChapterModal(false); setModalChapterParentId(null); };
  const closeAddPageModal = () => { setShowAddPageModal(false); setModalPageParentId(null); };

  // Validasi & submit komik
  const handleAddComicModal = () => {
    if (!newTitle.trim()) {
      setComicError("Judul komik wajib diisi");
      return;
    }
    setComicError("");
    handleAddComic();
    closeAddComicModal();
  };
  // Validasi & submit chapter
  const handleAddChapterModal = () => {
    if (!newChapterTitle.trim()) {
      setChapterError("Judul chapter wajib diisi");
      return;
    }
    setChapterError("");
    handleAddChapter();
    closeAddChapterModal();
  };
  // Validasi & submit halaman
  const handleAddPageModal = () => {
    if (!newPageFile) {
      setPageError("File gambar wajib diupload");
      return;
    }
    setPageError("");
    if (modalPageParentId) handleAddPage(modalPageParentId);
    closeAddPageModal();
  };

  // Handler buka modal edit
  const handleOpenEdit = (comic: Comic) => {
    setEditComic(comic);
    setEditTitle(comic.title);
    setEditDescription(comic.synopsis);
    setEditCover(comic.cover);
    setEditCoverFile(null);
    setEditFields({
      genre: comic.genre || "",
      category: comic.category || "",
      tags: (comic.tags || []).join(", "),
      language: comic.language || "",
      audience: comic.audience || "",
      authorAlias: comic.authorAlias || "",
      authorBioUrl: comic.authorBioUrl || "",
      status: comic.status || '',
      year: comic.year || "",
    });
    setShowEditModal(true);
  };
  // Handler edit cover
  const handleEditCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Compress image before preview/upload
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1600,
        useWebWorker: true,
        initialQuality: 0.7,
      });
      setEditCoverFile(compressedFile);
      if (hasMounted) {
        setEditCover(URL.createObjectURL(compressedFile));
      }
    }
  };
  // Handler simpan edit
  const handleSaveEdit = async () => {
    if (!editComic || !user) return;
    let coverUrl = editComic.cover;

    try {
      // Upload new cover image if exists
      if (editCoverFile) {
        const coverStorageRef = storageRef(storage, `komik/${user.uid}/${editComic.id}/coverimage`);
        await uploadBytes(coverStorageRef, editCoverFile);
        coverUrl = await getDownloadURL(coverStorageRef);
      }

      const allowedEditStatus = ['draft', 'published', 'review'];
      const statusEditToSave = allowedEditStatus.includes(editFields.status) ? editFields.status : 'draft';
      const updateData = {
        title: editTitle,
        synopsis: editDescription,
        cover: coverUrl,
        updatedAt: new Date().toISOString(),
        genre: editFields.genre,
        category: editFields.category,
        tags: editFields.tags.split(',').map(t => t.trim()).filter(Boolean),
        language: editFields.language,
        audience: editFields.audience,
        authorAlias: editFields.authorAlias,
        authorBioUrl: editFields.authorBioUrl,
        status: statusEditToSave as 'draft' | 'published' | 'review',
        year: editFields.year,
      };

      const response = await fetch(`/api/comics/${editComic.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        setComics(comics.map(c => c.id === editComic.id ? { ...c, ...updateData } : c));
        setShowEditModal(false);
        setEditComic(null);
        toast.success('Komik berhasil diperbarui!');
      } else {
        console.error('Failed to update comic');
        toast.error('Gagal memperbarui komik');
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error('Error: ' + error.message);
        console.error('Error updating comic:', error.message);
      } else {
        toast.error('Terjadi kesalahan saat memperbarui komik');
        console.error('Error updating comic:', error);
      }
    }
  };
  // Handler hapus komik
  const handleDeleteComic = async () => {
    if (!deleteComicId) return;
    try {
      await fetch(`/api/comics/${deleteComicId}`, { method: 'DELETE' });
      setComics(comics.filter(c => c.id !== deleteComicId));
      setShowDeleteConfirm(false);
      setDeleteComicId(null);
      if (selectedComicId === deleteComicId) setSelectedComicId(null);
    } catch (error) {
      console.error('Error deleting comic:', error);
    }
  };

  // Handler buka modal edit chapter
  const handleOpenEditChapter = (chapter: Chapter) => {
    setEditChapter(chapter);
    setEditChapterTitle(chapter.title);
    setEditChapterPricePerPage(chapter.pricePerPage);
    setEditChapterBundlePrice(chapter.bundlePrice);
    setShowEditChapterModal(true);
  };
  // Handler simpan edit chapter
  const handleSaveEditChapter = async () => {
    if (!selectedComicId || !editChapter) return;
    const updatedChapter = {
      ...editChapter,
      title: editChapterTitle,
      pricePerPage: editChapterPricePerPage,
      bundlePrice: editChapterBundlePrice,
    };
    // Update di state
    setComics(comics.map(comic =>
      comic.id === selectedComicId
        ? { ...comic, chapters: comic.chapters.map(ch => ch.id === editChapter.id ? updatedChapter : ch) }
        : comic
    ));
    // Update di Firestore
    try {
      const doc = comics.find(c => c.id === selectedComicId);
      if (doc) {
        const updatedChapters = doc.chapters.map(ch => ch.id === editChapter.id ? updatedChapter : ch);
        await fetch(`/api/comics/${selectedComicId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chapters: updatedChapters }),
        });
      }
      setShowEditChapterModal(false);
      setEditChapter(null);
    } catch (error) {
      console.error('Error updating chapter:', error);
    }
  };
  // Handler hapus chapter
  const handleDeleteChapter = async () => {
    if (!selectedComicId || !deleteChapterId) return;
    // Update di state
    setComics(comics.map(comic =>
      comic.id === selectedComicId
        ? { ...comic, chapters: comic.chapters.filter(ch => ch.id !== deleteChapterId) }
        : comic
    ));
    // Update di Firestore
    try {
      const doc = comics.find(c => c.id === selectedComicId);
      if (doc) {
        const updatedChapters = doc.chapters.filter(ch => ch.id !== deleteChapterId);
        await fetch(`/api/comics/${selectedComicId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chapters: updatedChapters }),
        });
      }
      setShowDeleteChapterConfirm(false);
      setDeleteChapterId(null);
    } catch (error) {
      console.error('Error deleting chapter:', error);
    }
  };
  // Handler hapus halaman
  const handleDeletePage = async () => {
    if (!selectedComicId || !deletePageInfo) return;
    const { chapterId, pageId } = deletePageInfo;
    // Update di state
    setComics(comics.map(comic =>
      comic.id === selectedComicId
        ? {
            ...comic,
            chapters: comic.chapters.map(ch =>
              ch.id === chapterId
                ? { ...ch, pages: ch.pages.filter(pg => pg.id !== pageId) }
                : ch
            )
          }
        : comic
    ));
    // Update di Firestore
    try {
      const doc = comics.find(c => c.id === selectedComicId);
      if (doc) {
        const updatedChapters = doc.chapters.map(ch =>
          ch.id === chapterId
            ? { ...ch, pages: ch.pages.filter(pg => pg.id !== pageId) }
            : ch
        );
        await fetch(`/api/comics/${selectedComicId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chapters: updatedChapters }),
        });
      }
      setShowDeletePageConfirm(false);
      setDeletePageInfo(null);
    } catch (error) {
      console.error('Error deleting page:', error);
    }
  };

  // Update handleSubmitForReview function
  const handleSubmitForReview = async (comicId: string) => {
    if (!user) return;
    
    try {
      const response = await fetch(`/api/comics/${comicId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'review',
          updatedAt: new Date().toISOString(),
          reviewNotes: submitNotes
        }),
      });

      if (response.ok) {
        setComics(comics.map(c => 
          c.id === comicId 
            ? { ...c, status: 'review' }
            : c
        ));
        toast.success('Komik berhasil diajukan untuk review!');
        setShowSubmitConfirm(false);
        setComicToSubmit(null);
        setSubmitNotes("");
      } else {
        console.error('Failed to submit comic for review');
        toast.error('Gagal mengajukan komik untuk review');
      }
    } catch (error) {
      console.error('Error submitting comic for review:', error);
      toast.error('Terjadi kesalahan saat mengajukan komik untuk review');
    }
  };

  // Add new function to handle submit button click
  const handleSubmitClick = (comicId: string) => {
    setComicToSubmit(comicId);
    setShowSubmitConfirm(true);
  };

  // Handler untuk reorder halaman
  const handlePageDragEnd = async (result: DropResult, chapterId: string) => {
    setIsDraggingPage(false);
    if (!result.destination) return;

    // Extract the actual page ID from the draggableId
    const getPageId = (draggableId: string) => {
      const match = draggableId.match(/page-.*?-(.*)/);
      return match ? match[1] : draggableId;
    };

    setComics((prevComics: Comic[]) => prevComics.map((comic: Comic) => {
      if (comic.id !== selectedComicId) return comic;
      
      const updatedChapters = comic.chapters.map((ch: Chapter) => {
        if (ch.id !== chapterId) return ch;
        const pages = Array.from(ch.pages);
        const [removed] = pages.splice(result.source.index, 1);
        pages.splice(result.destination!.index, 0, removed);
        // Update order property
        const updatedPages = pages.map((p, idx) => ({ ...p, order: idx + 1 }));
        // Simpan ke backend
        (async () => {
          await fetch(`/api/comics/${selectedComicId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chapters: comic.chapters.map((c: Chapter) =>
                c.id === ch.id ? { ...c, pages: updatedPages } : c
              )
            }),
          });
        })();
        return { ...ch, pages: updatedPages };
      });

      return {
        ...comic,
        chapters: updatedChapters
      };
    }));
  };

  // Debug: log perubahan pages saat drag
  useEffect(() => {
    if (isDraggingPage) {
      console.log('Pages during drag:', comics.find(c => c.id === selectedComicId)?.chapters.map(ch => ch.pages));
    }
  }, [isDraggingPage, comics, selectedComicId]);

  // Rekap harian, mingguan, bulanan
  const pendapatanRekap = useMemo(() => {
    let total = 0, hari = 0, minggu = 0, bulan = 0;
    let pembelianTotal = 0, pembelianHari = 0, pembelianMinggu = 0, pembelianBulan = 0;
    const now = dayjs();
    chapterAnalytics.forEach(comic => {
      comic.chapters.forEach((ch: any) => {
        total += ch.totalRevenue || 0;
        pembelianTotal += ch.totalPurchases || 0;
        if (ch.lastPurchaseTime) {
          const t = dayjs(ch.lastPurchaseTime);
          if (t.isSame(now, 'day')) {
            hari += ch.totalRevenue || 0;
            pembelianHari += ch.totalPurchases || 0;
          }
          if (t.isSame(now, 'week')) {
            minggu += ch.totalRevenue || 0;
            pembelianMinggu += ch.totalPurchases || 0;
          }
          if (t.isSame(now, 'month')) {
            bulan += ch.totalRevenue || 0;
            pembelianBulan += ch.totalPurchases || 0;
          }
        }
      });
    });
    return {
      total, hari, minggu, bulan,
      pembelianTotal, pembelianHari, pembelianMinggu, pembelianBulan
    };
  }, [chapterAnalytics]);

  // Fetch all purchases for all comics in chapterAnalytics (for Analytik tab)
  useEffect(() => {
    if (!chapterAnalytics.length) return;
    const db = getFirestore(app);
    Promise.all(
      chapterAnalytics.map(comic =>
        getDocs(collection(db, `komik/${comic.comicId}/purchases`)).then(snap =>
          [comic.comicId, snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))]
        )
      )
    ).then(results => {
      setAllPurchases(Object.fromEntries(results));
    });
  }, [chapterAnalytics]);

  // Handler untuk reorder chapter
  const handleChapterDragEnd = ({ active, over }: { active: any, over: any }) => {
    if (!over || active.id === over.id || !selectedComic) return;
    const oldIndex = selectedComic.chapters.findIndex(ch => ch.id === active.id);
    const newIndex = selectedComic.chapters.findIndex(ch => ch.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;
    const newChapters = arrayMove(selectedComic.chapters, oldIndex, newIndex).map((ch, idx) => ({ ...ch, order: idx + 1 }));
    setComics(comics => comics.map(comic =>
      comic.id === selectedComicId ? { ...comic, chapters: newChapters } : comic
    ));
    // Simpan ke backend
    (async () => {
      await fetch(`/api/comics/${selectedComicId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chapters: newChapters }),
      });
    })();
  };

  return !hasMounted ? <div /> : (
    <div className="min-h-screen bg-gray-50 flex md:px-12 flex-col">
      {/* Info login di kanan atas, dengan foto profil */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2 text-sm text-gray-600 bg-white/80 rounded-full px-3 py-1 shadow">
        {user && (
          <>
            {user.photoURL ? (
              <Image src={user.photoURL || ''} alt={user.displayName || 'avatar'} width={28} height={28} className="w-7 h-7 rounded-full object-cover border" />
            ) : (
              <span className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                <UserIcon className="w-4 h-4 text-primary/60" />
              </span>
            )}
            <span className="font-semibold">{user.displayName || user.email}</span>
          </>
        )}
      </div>
      <Toaster position="top-right" />
      {/* Modal Tambah Komik */}
      <Modal open={showAddComicModal} onClose={closeAddComicModal} title="Buat Komik Baru">
        <form className="flex flex-col gap-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Judul Komik <span className="text-red-500">*</span></label>
                <input className="w-full border rounded px-2 py-1" value={newTitle} onChange={e => setNewTitle(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Deskripsi</label>
                <textarea className="w-full border rounded px-2 py-1 min-h-[60px]" value={newDescription} onChange={e => setNewDescription(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Cover</label>
                <input type="file" accept="image/*" onChange={handleNewCoverChange} />
                {newCover && <Image src={newCover} alt="Preview Cover" width={200} height={200} className="w-full h-auto rounded" />}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Genre Komik</label>
                <div className="flex flex-wrap gap-2">
                  {genreOptions.map(opt => (
                    <label key={opt.value} className="flex items-center gap-1 text-xs cursor-pointer">
                      <input
                        type="checkbox"
                        value={opt.value}
                        checked={newGenres.includes(opt.value)}
                        onChange={e => {
                          if (e.target.checked) setNewGenres([...newGenres, opt.value]);
                          else setNewGenres(newGenres.filter(g => g !== opt.value));
                        }}
                        className="accent-primary"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Kategori</label>
                <select className="w-full border rounded px-2 py-1" value={newCategory} onChange={e => setNewCategory(e.target.value)}>
                  <option value="">Pilih Kategori</option>
                  <option value="remaja-laki">Remaja Laki-laki</option>
                  <option value="remaja-perempuan">Remaja Perempuan</option>
                  <option value="dewasa-laki">Dewasa Laki-laki</option>
                  <option value="kehidupan">Kehidupan Sehari-hari</option>
                  <option value="digital-vertikal">Digital Vertikal</option>
                  <option value="jepang">Komik Jepang</option>
                  <option value="pendek">Komik Pendek</option>
                  <option value="balita">Komik Balita</option>
                  <option value="anak">Komik Anak</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tag</label>
                <input className="w-full border rounded px-2 py-1" value={newTags} onChange={e => setNewTags(e.target.value)} placeholder="Pisahkan dengan koma, contoh: petualangan, persahabatan" />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Bahasa</label>
                <select className="w-full border rounded px-2 py-1" value={newLanguage} onChange={e => setNewLanguage(e.target.value)}>
                  <option value="">Pilih Bahasa</option>
                  <option value="id">Indonesia</option>
                  <option value="daerah">Bahasa Daerah</option>
                  <option value="en">English</option>
                  <option value="jp">Jepang</option>
                  <option value="kr">Korea</option>
                  <option value="other">Lainnya</option>
                </select>
                {newLanguage === "daerah" && (
                  <div className="mt-2">
                    <label className="block text-xs font-medium mb-1">Pilih Bahasa Daerah</label>
                    <select className="w-full border rounded px-2 py-1" value={newLocalLanguage} onChange={e => setNewLocalLanguage(e.target.value)}>
                      <option value="">Pilih Bahasa Daerah</option>
                      <option value="jawa">Jawa</option>
                      <option value="sunda">Sunda</option>
                      <option value="minang">Minang</option>
                      <option value="batak">Batak</option>
                      <option value="bugis">Bugis</option>
                      <option value="madura">Madura</option>
                      <option value="bali">Bali</option>
                      <option value="betawi">Betawi</option>
                      <option value="banjar">Banjar</option>
                      <option value="aceh">Aceh</option>
                      <option value="sasak">Sasak</option>
                      <option value="dayak">Dayak</option>
                      <option value="makassar">Makassar</option>
                      <option value="lampung">Lampung</option>
                      <option value="osing">Osing</option>
                    </select>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Target Audience (Usia)</label>
                <select className="w-full border rounded px-2 py-1" value={newAudience} onChange={e => setNewAudience(e.target.value)}>
                  <option value="">Pilih Usia</option>
                  <option value="all">Semua Umur</option>
                  <option value="teen">Remaja</option>
                  <option value="adult">Dewasa</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Penulis (Alias)</label>
                <input className="w-full border rounded px-2 py-1" value={newAuthorAlias} onChange={e => setNewAuthorAlias(e.target.value)} placeholder="Nama pena/alias (opsional)" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Link Biografi Penulis</label>
                <input className="w-full border rounded px-2 py-1" value={newAuthorBioUrl} onChange={e => setNewAuthorBioUrl(e.target.value)} placeholder="https://..." />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status Komik</label>
                <select className="w-full border rounded px-2 py-1" value={newStatus} onChange={e => setNewStatus(e.target.value as '' | 'draft' | 'published' | 'review')}>
                  <option value="">Pilih Status</option>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="review">Review</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tahun Rilis</label>
                <input type="number" className="w-full border rounded px-2 py-1" value={newYear} onChange={e => setNewYear(e.target.value)} placeholder="2024" />
              </div>
            </div>
          </div>
          {comicError && <div className="text-red-500 text-sm mb-2">{comicError}</div>}
          <button type="button" className="bg-primary text-white px-4 py-2 rounded w-full mt-2" onClick={handleAddComicModal}>Simpan Komik</button>
        </form>
      </Modal>
      {/* Modal Tambah Chapter */}
      <Modal open={showAddChapterModal} onClose={closeAddChapterModal} title="Tambah Chapter Baru">
        <form className="flex flex-col gap-4 w-full">
          <div>
            <label className="block text-sm font-medium mb-1">Judul Chapter <span className="text-red-500">*</span></label>
            <input className="w-full border rounded px-2 py-1" value={newChapterTitle} onChange={e => setNewChapterTitle(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Harga per Halaman</label>
            <input type="number" className="w-full border rounded px-2 py-1" value={newChapterPricePerPage} onChange={e => setNewChapterPricePerPage(Number(e.target.value))} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Harga Bundle</label>
            <input type="number" className="w-full border rounded px-2 py-1" value={newChapterBundlePrice} onChange={e => setNewChapterBundlePrice(Number(e.target.value))} />
          </div>
          {chapterError && <div className="text-red-500 text-sm">{chapterError}</div>}
          <button type="button" className="bg-primary text-white px-4 py-2 rounded w-full" onClick={handleAddChapterModal}>Tambah Chapter</button>
        </form>
      </Modal>
      {/* Modal Tambah Halaman */}
      <Modal open={showAddPageModal} onClose={closeAddPageModal} title="Tambah Halaman Baru">
        <form className="flex flex-col gap-4 w-full">
          <div>
            <label className="block text-sm font-medium mb-1">Upload Halaman <span className="text-red-500">*</span></label>
            <input type="file" accept="image/*" onChange={handleNewPageChange} />
            {newPagePreview && (
              <Image 
                src={newPagePreview} 
                alt="Preview Halaman" 
                width={80} 
                height={80} 
                className="max-w-[120px] w-auto h-auto rounded mx-auto"
              />
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Urutan</label>
            <input type="number" className="w-full border rounded px-2 py-1" value={newPageOrder} onChange={e => setNewPageOrder(Number(e.target.value))} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Halaman Berbayar</label>
            <input type="checkbox" checked={newPageIsPaid} onChange={e => setNewPageIsPaid(e.target.checked)} />
          </div>
          {pageError && <div className="text-red-500 text-sm">{pageError}</div>}
          <button type="button" className="bg-primary text-white px-4 py-2 rounded w-full" onClick={handleAddPageModal} disabled={!newPageFile || isCompressingPage}>
            {isCompressingPage ? 'Memproses gambar...' : 'Tambah Halaman'}
          </button>
        </form>
      </Modal>
      {/* Modal Edit Komik */}
      <Modal open={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Komik">
        <form className="flex flex-col gap-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Kolom kiri */}
            <div className="flex flex-col gap-4 h-full justify-center items-center">
              <div className="flex flex-col items-center gap-3">
                <label className="block text-sm font-medium mb-1">Cover</label>
                {editCover && <Image src={editCover} alt="Preview Cover" width={100} height={140} className="max-w-[100px] w-auto h-auto rounded mb-2" />}
                <input type="file" accept="image/*" onChange={handleEditCoverChange} className="w-full" />
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium mb-1">Judul Komik</label>
                <input className="w-full border rounded px-2 py-1" value={editTitle} onChange={e => setEditTitle(e.target.value)} />
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium mb-1">Deskripsi</label>
                <textarea className="w-full border rounded px-2 py-1 min-h-[60px]" value={editDescription} onChange={e => setEditDescription(e.target.value)} />
              </div>
            </div>
            {/* Kolom kanan */}
            <div className="flex flex-col gap-4">
              {/* Add review status display */}
              {selectedComic && selectedComic.status === 'review' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-2">
                  <div className="flex items-center gap-2 text-yellow-800">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-semibold">Status: Sedang dalam Review</span>
                  </div>
                  <p className="text-sm text-yellow-700 mt-1">
                    Komik Anda sedang dalam proses review oleh admin. Proses ini biasanya memakan waktu 1-3 hari kerja.
                  </p>
                </div>
              )}
              {selectedComic && selectedComic.status === 'published' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-2">
                  <div className="flex items-center gap-2 text-green-800">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-semibold">Status: Published</span>
                  </div>
                  <p className="text-sm text-green-700 mt-1">
                    Komik Anda telah dipublish dan dapat diakses oleh pembaca.
                  </p>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium mb-1">Genre Komik</label>
                <div className="flex flex-wrap gap-2">
                  {genreOptions.map(opt => (
                    <label key={opt.value} className="flex items-center gap-1 text-xs cursor-pointer">
                      <input
                        type="checkbox"
                        value={opt.value}
                        checked={(editFields.genre || '').split(',').includes(opt.value)}
                        onChange={e => {
                          let genres = (editFields.genre || '').split(',').filter(Boolean);
                          if (e.target.checked) genres.push(opt.value);
                          else genres = genres.filter(g => g !== opt.value);
                          setEditFields(f => ({ ...f, genre: genres.join(',') }));
                        }}
                        className="accent-primary"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Kategori</label>
                <select className="w-full border rounded px-2 py-1" value={editFields.category} onChange={e => setEditFields(f => ({ ...f, category: e.target.value }))}>
                  <option value="">Pilih Kategori</option>
                  <option value="remaja-laki">Remaja Laki-laki</option>
                  <option value="remaja-perempuan">Remaja Perempuan</option>
                  <option value="dewasa-laki">Dewasa Laki-laki</option>
                  <option value="kehidupan">Kehidupan Sehari-hari</option>
                  <option value="digital-vertikal">Digital Vertikal</option>
                  <option value="jepang">Komik Jepang</option>
                  <option value="pendek">Komik Pendek</option>
                  <option value="balita">Komik Balita</option>
                  <option value="anak">Komik Anak</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tag</label>
                <input className="w-full border rounded px-2 py-1" value={editFields.tags} onChange={e => setEditFields(f => ({ ...f, tags: e.target.value }))} placeholder="Pisahkan dengan koma, contoh: petualangan, persahabatan" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Bahasa</label>
                <select className="w-full border rounded px-2 py-1" value={editFields.language} onChange={e => setEditFields(f => ({ ...f, language: e.target.value }))}>
                  <option value="">Pilih Bahasa</option>
                  <option value="id">Indonesia</option>
                  <option value="daerah">Bahasa Daerah</option>
                  <option value="en">English</option>
                  <option value="jp">Jepang</option>
                  <option value="kr">Korea</option>
                  <option value="other">Lainnya</option>
                </select>
                {editFields.language === "daerah" && (
                  <div className="mt-2">
                    <label className="block text-xs font-medium mb-1">Pilih Bahasa Daerah</label>
                    <select className="w-full border rounded px-2 py-1" value={editFields.localLanguage || ""} onChange={e => setEditFields(f => ({ ...f, localLanguage: e.target.value }))}>
                      <option value="">Pilih Bahasa Daerah</option>
                      <option value="jawa">Jawa</option>
                      <option value="sunda">Sunda</option>
                      <option value="minang">Minang</option>
                      <option value="batak">Batak</option>
                      <option value="bugis">Bugis</option>
                      <option value="madura">Madura</option>
                      <option value="bali">Bali</option>
                      <option value="betawi">Betawi</option>
                      <option value="banjar">Banjar</option>
                      <option value="aceh">Aceh</option>
                      <option value="sasak">Sasak</option>
                      <option value="dayak">Dayak</option>
                      <option value="makassar">Makassar</option>
                      <option value="lampung">Lampung</option>
                      <option value="osing">Osing</option>
                    </select>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Target Audience (Usia)</label>
                <select className="w-full border rounded px-2 py-1" value={editFields.audience} onChange={e => setEditFields(f => ({ ...f, audience: e.target.value }))}>
                  <option value="">Pilih Usia</option>
                  <option value="all">Semua Umur</option>
                  <option value="teen">Remaja</option>
                  <option value="adult">Dewasa</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Penulis (Alias)</label>
                <input className="w-full border rounded px-2 py-1" value={editFields.authorAlias} onChange={e => setEditFields(f => ({ ...f, authorAlias: e.target.value }))} placeholder="Nama pena/alias (opsional)" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Link Biografi Penulis</label>
                <input className="w-full border rounded px-2 py-1" value={editFields.authorBioUrl} onChange={e => setEditFields(f => ({ ...f, authorBioUrl: e.target.value }))} placeholder="https://..." />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status Komik</label>
                <select className="w-full border rounded px-2 py-1" value={editFields.status} onChange={e => setEditFields(f => ({ ...f, status: e.target.value as '' | 'draft' | 'published' | 'review' }))}>
                  <option value="">Pilih Status</option>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="review">Review</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tahun Rilis</label>
                <input type="number" className="w-full border rounded px-2 py-1" value={editFields.year} onChange={e => setEditFields(f => ({ ...f, year: e.target.value }))} placeholder="2024" />
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button type="button" className="px-3 py-1 rounded bg-primary text-white" onClick={() => handleSaveEdit()}>Simpan Perubahan</button>
            {selectedComic && selectedComic.status !== 'review' && selectedComic.status !== 'published' && (
              <button 
                type="button"
                className="px-3 py-1 rounded bg-green-500 text-white" 
                onClick={() => selectedComic.id && handleSubmitClick(selectedComic.id)}
              >
                Submit untuk Review
              </button>
            )}
            <button type="button" className="px-3 py-1 rounded bg-red-500 text-white" onClick={() => { setDeleteComicId(selectedComic?.id || null); setShowDeleteConfirm(true); }}>Hapus</button>
          </div>
        </form>
      </Modal>
      {/* Modal Konfirmasi Hapus */}
      <Modal open={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)} title="Hapus Komik?">
        <div className="text-center py-4">
          <p>Yakin ingin menghapus komik ini? Tindakan ini tidak bisa dibatalkan.</p>
          <div className="flex gap-4 justify-center mt-6">
            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleDeleteComic}>Ya, Hapus</button>
            <button className="bg-gray-200 px-4 py-2 rounded" onClick={() => setShowDeleteConfirm(false)}>Batal</button>
          </div>
        </div>
      </Modal>
      {/* Modal Edit Chapter */}
      <Modal open={showEditChapterModal} onClose={() => setShowEditChapterModal(false)} title="Edit Chapter">
        <form className="flex flex-col gap-4 w-full">
          <div>
            <label className="block text-sm font-medium mb-1">Judul Chapter</label>
            <input className="w-full border rounded px-2 py-1" value={editChapterTitle} onChange={e => setEditChapterTitle(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Harga per Halaman</label>
            <input type="number" className="w-full border rounded px-2 py-1" value={editChapterPricePerPage} onChange={e => setEditChapterPricePerPage(Number(e.target.value))} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Harga Bundle</label>
            <input type="number" className="w-full border rounded px-2 py-1" value={editChapterBundlePrice} onChange={e => setEditChapterBundlePrice(Number(e.target.value))} />
          </div>
          <button type="button" className="bg-primary text-white px-4 py-2 rounded w-full" onClick={handleSaveEditChapter}>Simpan Perubahan</button>
        </form>
      </Modal>
      {/* Modal Konfirmasi Hapus Chapter */}
      <Modal open={showDeleteChapterConfirm} onClose={() => setShowDeleteChapterConfirm(false)} title="Hapus Chapter?">
        <div className="text-center py-4">
          <p>Yakin ingin menghapus chapter ini? Tindakan ini tidak bisa dibatalkan.</p>
          <div className="flex gap-4 justify-center mt-6">
            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleDeleteChapter}>Ya, Hapus</button>
            <button className="bg-gray-200 px-4 py-2 rounded" onClick={() => setShowDeleteChapterConfirm(false)}>Batal</button>
          </div>
        </div>
      </Modal>
      {/* Modal Konfirmasi Hapus Halaman */}
      <Modal open={showDeletePageConfirm} onClose={() => setShowDeletePageConfirm(false)} title="Hapus Halaman?">
        <div className="text-center py-4">
          <p>Yakin ingin menghapus halaman ini? Tindakan ini tidak bisa dibatalkan.</p>
          <div className="flex gap-4 justify-center mt-6">
            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleDeletePage}>Ya, Hapus</button>
            <button className="bg-gray-200 px-4 py-2 rounded" onClick={() => setShowDeletePageConfirm(false)}>Batal</button>
          </div>
        </div>
      </Modal>
      {/* Modal Konfirmasi Submit */}
      <Modal open={showSubmitConfirm} onClose={() => setShowSubmitConfirm(false)} title="Submit untuk Review">
        <div className="flex flex-col gap-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-800 mb-2">Perhatian!</h3>
            <ul className="list-disc ml-4 text-sm text-yellow-700 space-y-1">
              <li>Pastikan semua informasi komik sudah lengkap dan benar</li>
              <li>Cover komik harus sesuai dengan konten</li>
              <li>Semua chapter dan halaman sudah lengkap</li>
              <li>Konten tidak mengandung unsur SARA, pornografi, atau kekerasan berlebihan</li>
              <li>Komik akan direview oleh admin dalam waktu 1-3 hari kerja</li>
            </ul>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Catatan untuk Admin (Opsional)</label>
            <textarea 
              className="w-full border rounded px-2 py-1 min-h-[100px]" 
              value={submitNotes}
              onChange={(e) => setSubmitNotes(e.target.value)}
              placeholder="Tambahkan catatan khusus untuk admin (opsional)"
            />
          </div>
          <div className="flex gap-2 justify-end mt-4">
            <button 
              className="px-4 py-2 rounded bg-gray-200" 
              onClick={() => setShowSubmitConfirm(false)}
            >
              Batal
            </button>
            <button 
              className="px-4 py-2 rounded bg-green-500 text-white" 
              onClick={() => comicToSubmit && handleSubmitForReview(comicToSubmit)}
            >
              Ya, Submit untuk Review
            </button>
          </div>
        </div>
      </Modal>
      {/* Modal Withdraw */}
      {showWithdrawModal && (
        <Modal open={showWithdrawModal} onClose={() => setShowWithdrawModal(false)} title="Penarikan Saldo">
          <form className="flex flex-col gap-4 w-full" onSubmit={e => { e.preventDefault(); }}>
            <div>
              <label className="block text-sm font-medium mb-1">Jumlah Penarikan</label>
              <input
                type="number"
                className="w-full border rounded px-2 py-1"
                min={300000}
                max={pendapatanRekap.total}
                value={withdrawAmount}
                onChange={e => setWithdrawAmount(Number(e.target.value))}
              />
              <div className="text-xs text-gray-500">Minimal Rp300.000, maksimal Rp{pendapatanRekap.total.toLocaleString()}</div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Metode Penarikan</label>
              <select
                className="w-full border rounded px-2 py-1"
                value={withdrawMethod}
                onChange={e => setWithdrawMethod(e.target.value)}
              >
                <option value="OVO">OVO</option>
                <option value="DANA">DANA</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Nomor {withdrawMethod}</label>
              <input
                type="text"
                className="w-full border rounded px-2 py-1"
                value={withdrawNumber}
                onChange={e => setWithdrawNumber(e.target.value)}
                placeholder={`Masukkan nomor ${withdrawMethod}`}
              />
            </div>
            {withdrawError && <div className="text-red-500 text-sm">{withdrawError}</div>}
            {withdrawSuccess && <div className="text-green-600 text-sm">{withdrawSuccess}</div>}
            <div className="flex gap-2 mt-2">
              <button
                type="button"
                className="px-4 py-2 rounded bg-primary text-white"
                onClick={() => {
                  // Validasi
                  if (withdrawAmount < 300000) {
                    setWithdrawError('Minimal penarikan Rp300.000');
                    setWithdrawSuccess('');
                    return;
                  }
                  if (withdrawAmount > pendapatanRekap.total) {
                    setWithdrawError('Jumlah melebihi saldo');
                    setWithdrawSuccess('');
                    return;
                  }
                  if (!withdrawNumber.trim()) {
                    setWithdrawError('Nomor wajib diisi');
                    setWithdrawSuccess('');
                    return;
                  }
                  // Submit dummy
                  setWithdrawError('');
                  setWithdrawSuccess('Permintaan penarikan sedang diproses.');
                  // Tutup modal setelah 2 detik
                  setTimeout(() => setShowWithdrawModal(false), 2000);
                }}
              >
                Konfirmasi Penarikan
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded bg-gray-200"
                onClick={() => setShowWithdrawModal(false)}
              >
                Batal
              </button>
            </div>
          </form>
        </Modal>
      )}
      {/* Konten utama hanya upload form */}
      <div className="flex-1 h-screen flex flex-col justify-center">
        <div className="p-6 md:p-8 m-4 max-w-6xl mx-auto w-full text-left h-[calc(100vh-2rem)] overflow-auto">
          <h1 className="text-3xl font-extrabold text-primary mb-12">UPLOAD KOMIKMU DI SINI</h1>
         
            <div className="w-full">
              {/* Daftar Komik */}
              <div className="mb-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {comics.map(comic => (
                    <button
                      key={comic.id}
                      className={`px-3 py-1 rounded-lg border text-sm font-medium shadow-sm transition-all duration-150 ${selectedComicId === comic.id ? "bg-primary text-white border-primary" : "bg-white text-gray-700 border-gray-200 hover:bg-primary/10"}`}
                      onClick={() => setSelectedComicId(comic.id)}
                    >
                      {comic.title}
                    </button>
                  ))}
                  <button className="flex items-center gap-1 px-3 py-1 rounded-lg bg-primary text-white text-sm font-medium shadow-sm hover:bg-primary/90 transition-all" onClick={openAddComicModal}>
                    <Plus className="w-4 h-4" /> Buat Komik Baru
                  </button>
                </div>
              </div>
              {/* Jika belum ada komik dipilih, tampilkan pesan dan sembunyikan form tambah chapter/halaman */}
              {!selectedComicId && (
                <div className="text-gray-500 mb-8">Pilih komik terlebih dahulu untuk menambah chapter atau halaman.</div>
              )}
              {/* Form Edit Komik & Chapter hanya tampil jika ada komik dipilih */}
              {selectedComic && (
                <div className="w-full bg-white rounded-2xl shadow p-6 md:p-8 mb-8 flex flex-col gap-6">
                  <h2 className="text-xl font-bold mb-2">Edit Komik: {selectedComic.title}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full items-start">
                    {/* Gambar cover di kiri */}
                    <div className="flex flex-col items-center justify-center">
                      <label className="block text-xs font-semibold mb-1 text-gray-500">Cover</label>
                      {selectedComic.cover && <Image src={selectedComic.cover} alt="Cover" width={160} height={240} className="w-full max-w-[160px] h-auto object-cover rounded-lg shadow" />}
                    </div>
                    {/* Form di kanan (span 2 kolom) */}
                    <div className="flex flex-col gap-3 md:col-span-2">
                      <div>
                        <label className="block text-xs font-semibold mb-1 text-gray-500">Judul Komik</label>
                        <input className="w-full border rounded-lg px-2 py-1 text-sm" value={selectedComic.title} readOnly />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1 text-gray-500">Deskripsi</label>
                        <textarea className="w-full border rounded-lg px-2 py-1 min-h-[48px] text-sm" value={selectedComic.synopsis} readOnly />
                      </div>
                    </div>
                  </div>
                  {/* List Chapter */}
                  <div className="w-full">
                    <h3 className="font-semibold mb-2 flex items-center justify-between">
                      Chapter
                      <button
                        className="bg-primary text-white px-3 py-1 rounded text-sm"
                        onClick={() => openAddChapterModal(selectedComic.id)}
                      >
                        + Chapter
                      </button>
                    </h3>
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleChapterDragEnd}>
                      <SortableContext items={selectedComic.chapters.map(ch => ch.id)} strategy={horizontalListSortingStrategy}>
                        <div className="space-y-4">
                          {selectedComic.chapters.map((chapter: Chapter) => (
                            <SortableChapter key={chapter.id} chapter={chapter}>
                              {({ attributes, listeners }) => (
                                <div className="p-3 border rounded-xl bg-white flex flex-col gap-2 shadow-sm">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 flex-1 font-semibold text-base">
                                      <span {...attributes} {...listeners} className="cursor-grab text-gray-400 hover:text-primary"><GripVertical className="w-5 h-5" /></span>
                                      {editingChapterId === chapter.id ? (
                                        <div className="flex items-center gap-2">
                                          <input
                                            className="border rounded px-2 py-1 text-sm"
                                            value={editingChapterTitle}
                                            onChange={e => setEditingChapterTitle(e.target.value)}
                                            onKeyDown={e => {
                                              if (e.key === 'Enter') handleEditChapterInline(chapter.id);
                                              if (e.key === 'Escape') setEditingChapterId(null);
                                            }}
                                            autoFocus
                                          />
                                          <button className="btn-icon bg-green-500 text-white" title="Simpan" onClick={() => handleEditChapterInline(chapter.id)}><Check className="w-4 h-4" /></button>
                                          <button className="btn-icon bg-gray-300" title="Batal" onClick={() => setEditingChapterId(null)}><X className="w-4 h-4" /></button>
                                        </div>
                                      ) : (
                                        chapter.title
                                      )}
                                    </div>
                                    <div className="flex gap-1 items-center">
                                      {/* Toggle isComment dengan label */}
                                      <span className="text-xs mr-1">Comment</span>
                                      <Switch
                                        checked={!!chapter.isComment}
                                        onCheckedChange={async (val) => {
                                          setComics(comics => comics.map(comic =>
                                            comic.id === selectedComicId
                                              ? {
                                                  ...comic,
                                                  chapters: comic.chapters.map(ch =>
                                                    ch.id === chapter.id ? { ...ch, isComment: val } : ch
                                                  )
                                                }
                                              : comic
                                          ));
                                          const doc = comics.find(c => c.id === selectedComicId);
                                          if (doc) {
                                            const updatedChapters = doc.chapters.map(ch =>
                                              ch.id === chapter.id ? { ...ch, isComment: val } : ch
                                            );
                                            await fetch(`/api/comics/${selectedComicId}`, {
                                              method: 'PATCH',
                                              headers: { 'Content-Type': 'application/json' },
                                              body: JSON.stringify({ chapters: updatedChapters }),
                                            });
                                          }
                                        }}
                                        className={`${chapter.isComment ? 'bg-primary' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none mr-2`}
                                      >
                                        <span className="sr-only">Aktifkan Komentar</span>
                                        <span
                                          className={`${chapter.isComment ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                                        />
                                      </Switch>
                                      {/* Tombol edit nama (pencil) tetap aktif */}
                                      <button className="btn-icon" title="Edit Nama" onClick={() => { setEditingChapterId(chapter.id); setEditingChapterTitle(chapter.title); }}><Edit2 className="w-4 h-4" /></button>
                                      <button className="btn-icon" title="Edit Detail" onClick={() => handleOpenEditChapter(chapter)}><Settings className="w-4 h-4" /></button>
                                      <button className="btn-icon" title="Hapus" onClick={() => { setDeleteChapterId(chapter.id); setShowDeleteChapterConfirm(true); }}><Trash2 className="w-4 h-4 text-red-500" /></button>
                                      <button
                                        className="btn-icon bg-primary text-white"
                                        title="Tambah Halaman"
                                        onClick={() => openAddPageModal(chapter.id)}
                                        disabled={isDraggingPage}
                                      >
                                        <Plus className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </div>
                                  {/* Daftar Halaman dengan drag-and-drop */}
                                  {chapter.pages && chapter.pages.length > 0 && (
                                    <DndContext
                                      sensors={sensors}
                                      collisionDetection={closestCenter}
                                      onDragEnd={({ active, over }) => {
                                        if (!over || active.id === over.id) return;
                                        setComics(prevComics => prevComics.map(comic => {
                                          if (comic.id !== selectedComicId) return comic;
                                          return {
                                            ...comic,
                                            chapters: comic.chapters.map(ch => {
                                              if (ch.id !== chapter.id) return ch;
                                              const oldIndex = ch.pages.findIndex(p => p.id === active.id);
                                              const newIndex = ch.pages.findIndex(p => p.id === over.id);
                                              const newPages = arrayMove(ch.pages, oldIndex, newIndex).map((p, idx) => ({ ...p, order: idx + 1 }));
                                              // Simpan ke backend
                                              (async () => {
                                                await fetch(`/api/comics/${selectedComicId}`, {
                                                  method: 'PATCH',
                                                  headers: { 'Content-Type': 'application/json' },
                                                  body: JSON.stringify({
                                                    chapters: comic.chapters.map(c =>
                                                      c.id === ch.id ? { ...c, pages: newPages } : c
                                                    )
                                                  }),
                                                });
                                              })();
                                              return { ...ch, pages: newPages };
                                            })
                                          };
                                        }));
                                      }}
                                    >
                                      <SortableContext
                                        items={chapter.pages.map(p => p.id)}
                                        strategy={horizontalListSortingStrategy}
                                      >
                                        <div className="flex flex-wrap gap-3 mt-2">
                                          {sortedPagesPerChapter[chapter.id]
                                            .slice()
                                            .map((page: ComicPage) => (
                                              <SortablePage key={page.id} page={page}>
                                                <div className="relative w-20">
                                                  <Image src={page.imageUrl} alt="" width={80} height={112} className="w-20 h-28 object-cover rounded mb-1" />
                                                  <div className="text-xs text-gray-500">Urutan: {page.order}</div>
                                                  <div className="text-xs text-gray-400">{page.isPaid ? "Berbayar" : "Gratis"}</div>
                                                  <button
                                                    className="btn-icon absolute top-1 right-1 z-20"
                                                    title="Hapus"
                                                    onClick={() => { setDeletePageInfo({ chapterId: chapter.id, pageId: page.id }); setShowDeletePageConfirm(true); }}
                                                    disabled={isDraggingPage}
                                                  >
                                                    <Trash2 className="w-4 h-4 text-red-500" />
                                                  </button>
                                                </div>
                                              </SortablePage>
                                            ))}
                                        </div>
                                      </SortableContext>
                                    </DndContext>
                                  )}
                                </div>
                              )}
                            </SortableChapter>
                          ))}
                        </div>
                      </SortableContext>
                    </DndContext>
                  </div>
                </div>
              )}
            </div>
        </div>
      </div>
      {/* Modal Preview Komik */}
      {previewId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setPreviewId(null)}>
          <div
            className="bg-black rounded-xl shadow-lg p-2 relative"
            style={{ width: 393, height: 852 }}
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-white bg-gray-800 rounded-full px-3 py-1 text-lg"
              onClick={() => setPreviewId(null)}
            >
              &times;
            </button>
            <iframe
              src={`https://mu-komik.com/${previewId}`}
              width={393}
              height={852}
              className="rounded-lg border-0"
              style={{ background: 'white' }}
              title="Preview Komik"
            />
          </div>
        </div>
      )}
    </div>
  );
} 