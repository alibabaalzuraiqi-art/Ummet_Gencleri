import { useState } from 'react';
import { Images, Filter, Play, Calendar, MapPin, Camera, Video, X } from 'lucide-react';

type GalleryCategory = 'all' | 'football' | 'skiing' | 'academic' | 'erzurum';

interface Album {
  id: string;
  title: string;
  category: Exclude<GalleryCategory, 'all'>;
  date: string;
  location: string;
  coverImage: string;
  photoCount: number;
  videoCount: number;
  description: string;
}

const albums: Album[] = [
  {
    id: 'a1',
    title: 'بطولة كرة القدم الربيعية',
    category: 'football',
    date: '2026-05-15',
    location: 'ملعب أتاتورك، أرضروم',
    coverImage: 'https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=800',
    photoCount: 48,
    videoCount: 3,
    description: 'البطولة السنوية لكرة القدم بين الفرق الطلابية، بمشاركة 8 فرق من مختلف الجامعات.',
  },
  {
    id: 'a2',
    title: 'مباراة النهائي الكروي',
    category: 'football',
    date: '2026-05-22',
    location: 'استاد كازيم كارابيكير',
    coverImage: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=800',
    photoCount: 62,
    videoCount: 5,
    description: 'مباراة نهائية مثيرة جمعت فريقي اتحاد شباب الأمة واتحاد الطلاب العرب.',
  },
  {
    id: 'a3',
    title: 'رحلة تزلج جبال بالكاندي',
    category: 'skiing',
    date: '2026-02-10',
    location: 'منتجع بالكاندي للتزلج',
    coverImage: 'https://images.pexels.com/photos/848612/pexels-photo-848612.jpeg?auto=compress&cs=tinysrgb&w=800',
    photoCount: 85,
    videoCount: 7,
    description: 'رحلة تزلج لا تُنسى على جبال أرضروم الثلجية، بمشاركة أكثر من 60 طالبًا.',
  },
  {
    id: 'a4',
    title: 'يوم التزلج الشتوي',
    category: 'skiing',
    date: '2026-01-20',
    location: 'منتجع كوناكلي',
    coverImage: 'https://images.pexels.com/photos/848612/pexels-photo-848612.jpeg?auto=compress&cs=tinysrgb&w=800',
    photoCount: 54,
    videoCount: 4,
    description: 'يوم مليء بالمرح والتزلج على المنحدرات الثلجية في كوناكلي.',
  },
  {
    id: 'a5',
    title: 'المؤتمر الأكاديمي السنوي',
    category: 'academic',
    date: '2026-04-05',
    location: 'قاعة المؤتمرات، جامعة أتاتورك',
    coverImage: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800',
    photoCount: 72,
    videoCount: 6,
    description: 'مؤتمر علمي ضم باحثين وطلابًا من مختلف التخصصات لعرض أوراقهم البحثية.',
  },
  {
    id: 'a6',
    title: 'ورشة عمل المهارات القيادية',
    category: 'academic',
    date: '2026-03-18',
    location: 'مركز التطوير الطلابي',
    coverImage: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
    photoCount: 38,
    videoCount: 2,
    description: 'ورشة تدريبية مكثفة لتطوير مهارات القيادة وإدارة الفرق لدى الطلاب.',
  },
  {
    id: 'a7',
    title: 'حفل أرضروم السنوي',
    category: 'erzurum',
    date: '2026-06-28',
    location: 'قصر المؤتمرات، أرضروم',
    coverImage: 'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=800',
    photoCount: 120,
    videoCount: 12,
    description: 'الحفل السنوي الكبير لاتحاد شباب الأمة، سهرة فنية وثقافية لا تُنسى.',
  },
  {
    id: 'a8',
    title: 'احتفالات يوم الأمة',
    category: 'erzurum',
    date: '2026-03-01',
    location: 'ساحة أزiziye، أرضروم',
    coverImage: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800',
    photoCount: 95,
    videoCount: 8,
    description: 'احتفال كبير بيوم الأمة شمل عروضًا ثقافية وأنشطة شبابية متنوعة.',
  },
];

const categoryConfig: { key: GalleryCategory; label: string; icon: typeof Filter }[] = [
  { key: 'all', label: 'الكل', icon: Images },
  { key: 'football', label: 'كرة القدم', icon: Images },
  { key: 'skiing', label: 'رحلات التزلج', icon: Images },
  { key: 'academic', label: 'الأنشطة الأكاديمية', icon: Images },
  { key: 'erzurum', label: 'حفل أرضروم', icon: Images },
];

export default function MediaGallery() {
  const [filter, setFilter] = useState<GalleryCategory>('all');
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);

  const filtered = filter === 'all' ? albums : albums.filter((a) => a.category === filter);

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy-50 to-gray-50 pt-20 lg:pt-24">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-l from-navy-900 to-navy-950 py-16">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url(https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=1200)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="container-app relative">
          <div className="flex items-center gap-3 text-gold-400">
            <Images className="h-6 w-6" />
            <span className="text-sm font-bold tracking-wide">معرض الصور والذاكرة</span>
          </div>
          <h1 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">لحظات من تاريخ الاتحاد</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-300">
            أرشيف بصري يحفظ ذكريات أنشطتنا وفعالياتنا المختلفة، من المباريات الرياضية إلى الرحلات والمؤتمرات الأكاديمية والأمسيات الاحتفالية.
          </p>
        </div>
      </div>

      <div className="container-app py-10">
        {/* Filter tabs */}
        <div className="mb-8 flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
            <Filter className="h-4 w-4" />
            تصفية:
          </div>
          {categoryConfig.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.key}
                onClick={() => setFilter(cat.key)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
                  filter === cat.key
                    ? 'bg-navy-800 text-white shadow-lg'
                    : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-4 w-4" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Albums grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((album) => (
            <div
              key={album.id}
              onClick={() => setSelectedAlbum(album)}
              className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-gray-100 transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={album.coverImage}
                  alt={album.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                {album.videoCount > 0 && (
                  <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-sm">
                    <Play className="h-3 w-3" />
                    {album.videoCount} فيديو
                  </div>
                )}
                <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-sm">
                  <Camera className="h-3 w-3" />
                  {album.photoCount} صورة
                </div>
                <div className="absolute bottom-0 right-0 left-0 p-4">
                  <h3 className="text-lg font-bold text-white drop-shadow-lg">{album.title}</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(album.date).toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {album.location}
                  </span>
                </div>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-600">{album.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Album detail modal */}
      {selectedAlbum && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setSelectedAlbum(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedAlbum(null)}
              className="absolute left-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="relative aspect-video overflow-hidden rounded-t-2xl">
              <img src={selectedAlbum.coverImage} alt={selectedAlbum.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 right-0 left-0 p-6">
                <h2 className="text-2xl font-extrabold text-white drop-shadow-lg">{selectedAlbum.title}</h2>
                <div className="mt-2 flex items-center gap-4 text-sm text-gray-200">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(selectedAlbum.date).toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {selectedAlbum.location}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-sm leading-relaxed text-gray-600">{selectedAlbum.description}</p>
              <div className="mt-4 flex gap-3">
                <div className="flex items-center gap-2 rounded-xl bg-navy-50 px-4 py-2 text-sm font-bold text-navy-700">
                  <Camera className="h-4 w-4" />
                  {selectedAlbum.photoCount} صورة
                </div>
                {selectedAlbum.videoCount > 0 && (
                  <div className="flex items-center gap-2 rounded-xl bg-sky-50 px-4 py-2 text-sm font-bold text-sky-700">
                    <Video className="h-4 w-4" />
                    {selectedAlbum.videoCount} فيديو
                  </div>
                )}
              </div>
              {/* Photo grid placeholder */}
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-square overflow-hidden rounded-xl bg-gray-100">
                    <img
                      src={selectedAlbum.coverImage}
                      alt={`${selectedAlbum.title} - ${i + 1}`}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
              <p className="mt-4 text-center text-xs text-gray-400">معاينة — اضغط على الصور لعرضها بالحجم الكامل</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
