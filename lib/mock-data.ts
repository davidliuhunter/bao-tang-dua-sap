import type { Artifact, Article, Category, Collection, ContactMessage, EventItem } from './types';

export const mockCategories: Category[] = [
  {
    id: 'cat-1',
    name: 'Dừa Sáp',
    description: 'Các hiện vật liên quan đến giống dừa đặc biệt Dừa Sáp',
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'cat-2',
    name: 'Công cụ truyền thống',
    description: 'Dụng cụ sản xuất, chế biến dừa truyền thống',
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'cat-3',
    name: 'Sản phẩm chế biến',
    description: 'Các sản phẩm từ dừa Cầu Kè',
    created_at: '2024-01-01T00:00:00Z',
  },
];

export const mockCollections: Collection[] = [
  {
    id: 'col-1',
    name: 'Bộ sưu tập gốc Cầu Kè',
    description: 'Dừa gốc từ các vườn lâu đời tại Cầu Kè',
    category_id: 'cat-1',
    created_at: '2024-01-01T00:00:00Z',
    category: mockCategories[0],
  },
  {
    id: 'col-2',
    name: 'Dụng cụ thủ công',
    description: 'Công cụ thủ công nghề dừa',
    category_id: 'cat-2',
    created_at: '2024-01-01T00:00:00Z',
    category: mockCategories[1],
  },
  {
    id: 'col-3',
    name: 'Sản phẩm đặc trưng',
    description: 'Sản phẩm nổi tiếng từ dừa sáp',
    category_id: 'cat-3',
    created_at: '2024-01-01T00:00:00Z',
    category: mockCategories[2],
  },
];

export const mockArtifacts: Artifact[] = [
  {
    id: 'art-1',
    name: 'Quả Dừa Sáp nguyên bản',
    description:
      'Quả dừa sáp nguyên bản từ vườn dừa lâu đời nhất tại Cầu Kè, Trà Vinh. Đây là giống dừa đột biến tự nhiên độc đáo, phần cơm đặc như thạch thay vì dạng nước thông thường.',
    origin: 'Cầu Kè, Trà Vinh',
    era: 'Đầu thế kỷ XX',
    material: 'Tự nhiên',
    collection_id: 'col-1',
    status: 'published',
    image_url: null,
    created_at: '2024-01-01T00:00:00Z',
    collection: mockCollections[0],
  },
  {
    id: 'art-2',
    name: 'Cái nạo dừa cổ',
    description:
      'Dụng cụ nạo cơm dừa truyền thống được chế tác bằng gỗ mít và thanh kim loại. Vật dụng này đã được dùng trong hàng trăm hộ gia đình tại Cầu Kè qua nhiều thế hệ.',
    origin: 'Cầu Kè, Trà Vinh',
    era: 'Giữa thế kỷ XX',
    material: 'Gỗ mít, kim loại',
    collection_id: 'col-2',
    status: 'published',
    image_url: null,
    created_at: '2024-01-02T00:00:00Z',
    collection: mockCollections[1],
  },
  {
    id: 'art-3',
    name: 'Kẹo dừa sáp thủ công',
    description:
      'Mẫu kẹo dừa sáp được chế biến theo phương pháp thủ công truyền thống. Kẹo dừa sáp có hương vị đặc biệt nhờ vào hàm lượng dầu cao và kết cấu béo mịn của cơm dừa.',
    origin: 'Cầu Kè, Trà Vinh',
    era: 'Hiện đại',
    material: 'Dừa sáp, đường, malt',
    collection_id: 'col-3',
    status: 'published',
    image_url: null,
    created_at: '2024-01-03T00:00:00Z',
    collection: mockCollections[2],
  },
  {
    id: 'art-4',
    name: 'Tranh vẽ vườn dừa Cầu Kè',
    description:
      'Bức tranh sơn dầu mô tả cảnh quan vườn dừa sáp tại Cầu Kè vào thập niên 1980. Tác phẩm ghi lại hình ảnh những hàng dừa cao vút và cuộc sống bình yên của người dân địa phương.',
    origin: 'Cầu Kè, Trà Vinh',
    era: 'Thập niên 1980',
    material: 'Sơn dầu trên canvas',
    collection_id: 'col-1',
    status: 'published',
    image_url: null,
    created_at: '2024-01-04T00:00:00Z',
    collection: mockCollections[0],
  },
];

export const mockArticles: Article[] = [
  {
    id: 'arti-1',
    title: 'Nguồn gốc và đặc điểm của Dừa Sáp Cầu Kè',
    content: `Dừa Sáp (Cocos nucifera L. var. Makapuno) là giống dừa đặc biệt xuất hiện do đột biến gen tự nhiên. Khác với dừa thường, cơm dừa sáp có kết cấu đặc sệt như thể đông đặc lại, với hàm lượng dầu cao và hương thơm đặc trưng.

Tại Việt Nam, Cầu Kè (Trà Vinh) là nơi tập trung nhiều nhất các vườn dừa sáp với hơn 300 năm lịch sử trồng trọt. Người Khmer bản địa đã gìn giữ và phát triển giống dừa quý này qua nhiều thế hệ.

Đặc điểm nhận biết: quả dừa sáp khi lắc không nghe tiếng nước bên trong, vỏ sần và hơi sẫm màu hơn dừa thường. Tỷ lệ ra quả sáp trong một buồng dừa thường chỉ đạt 20–30%, điều này làm tăng thêm sự quý hiếm của nó.`,
    summary:
      'Tìm hiểu về nguồn gốc và những đặc điểm độc đáo của giống dừa sáp nổi tiếng Cầu Kè, Trà Vinh.',
    status: 'published',
    image_url: null,
    created_at: '2024-02-01T00:00:00Z',
  },
  {
    id: 'arti-2',
    title: 'Công nghệ bảo tồn và nhân giống Dừa Sáp hiện đại',
    content: `Trong những năm gần đây, các nhà khoa học tại Viện Nghiên cứu Dầu và Cây có dầu TP.HCM đã nghiên cứu thành công phương pháp nhân giống dừa sáp thông qua kỹ thuật nuôi cấy phôi.

Kỹ thuật này cho phép tạo ra các cây dừa sáp thuần chủng với tỷ lệ cho quả sáp lên đến 90–100%, khắc phục hạn chế lớn nhất của giống dừa này trong sản xuất thương mại.

Hiện nay, diện tích trồng dừa sáp tại Cầu Kè đã được mở rộng và nhân giống sang các tỉnh khác trong vùng ĐBSCL, đưa sản phẩm dừa sáp Cầu Kè trở thành thương hiệu nông sản nổi tiếng của Trà Vinh.`,
    summary:
      'Khám phá các phương pháp khoa học hiện đại trong bảo tồn và nhân giống dừa sáp để phát triển thương mại bền vững.',
    status: 'published',
    image_url: null,
    created_at: '2024-03-01T00:00:00Z',
  },
];

export const mockEvents: EventItem[] = [
  {
    id: 'evt-1',
    title: 'Lễ hội Dừa Sáp Cầu Kè 2026',
    description:
      'Lễ hội thường niên tôn vinh giống dừa đặc sản của Trà Vinh. Chương trình bao gồm: triển lãm hiện vật, trình diễn chế biến truyền thống, hội thi sản phẩm từ dừa sáp, và các hoạt động văn hóa Khmer.',
    location: 'Trung tâm Văn hóa huyện Cầu Kè, Trà Vinh',
    start_date: '2026-07-15',
    end_date: '2026-07-17',
    status: 'published',
    image_url: null,
    created_at: '2024-04-01T00:00:00Z',
  },
  {
    id: 'evt-2',
    title: 'Triển lãm "Di sản Dừa Sáp" tại TP.HCM',
    description:
      'Triển lãm giới thiệu văn hóa, lịch sử và giá trị kinh tế của Dừa Sáp Cầu Kè đến người dân thành thị. Trưng bày hiện vật gốc, ảnh tư liệu và sản phẩm hiện đại từ dừa sáp.',
    location: 'Nhà Văn hóa Thanh Niên, Q.1, TP.HCM',
    start_date: '2026-09-20',
    end_date: '2026-09-25',
    status: 'published',
    image_url: null,
    created_at: '2024-04-15T00:00:00Z',
  },
];

export const mockContactMessages: ContactMessage[] = [];
