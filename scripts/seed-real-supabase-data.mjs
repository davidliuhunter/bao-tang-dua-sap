import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables.');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const categories = [
  {
    name: 'Nguồn gốc dừa sáp',
    description: 'Tư liệu về lịch sử hình thành và giá trị đặc trưng của dừa sáp Cầu Kè, Trà Vinh.',
  },
  {
    name: 'Canh tác và công nghệ',
    description: 'Tư liệu về trồng trọt, cấy phôi, cấy mô và phát triển giống dừa sáp.',
  },
  {
    name: 'Văn hóa và lễ hội',
    description: 'Tư liệu về festival, Vu lan Thắng hội và các hoạt động văn hóa gắn với dừa sáp.',
  },
  {
    name: 'Sản phẩm chế biến',
    description: 'Tư liệu về sản phẩm OCOP, món ăn và chế biến từ dừa sáp Trà Vinh.',
  },
];

const collections = [
  {
    name: 'Tư liệu lịch sử Cầu Kè',
    description: 'Nhóm hiện vật và tư liệu về lịch sử hình thành cây dừa sáp tại Cầu Kè.',
    categoryName: 'Nguồn gốc dừa sáp',
  },
  {
    name: 'Thành tựu nghiên cứu và giống',
    description: 'Nhóm hiện vật và tư liệu về cấy phôi, cấy mô và phát triển vùng trồng dừa sáp.',
    categoryName: 'Canh tác và công nghệ',
  },
  {
    name: 'Festival và đời sống văn hóa',
    description: 'Nhóm hiện vật, hình ảnh và tư liệu gắn với Festival 100 năm dừa sáp Trà Vinh.',
    categoryName: 'Văn hóa và lễ hội',
  },
  {
    name: 'Ẩm thực và sản phẩm OCOP',
    description: 'Nhóm hiện vật và sản phẩm chế biến từ dừa sáp Cầu Kè.',
    categoryName: 'Sản phẩm chế biến',
  },
];

const artifacts = [
  {
    name: 'Trái dừa sáp Cầu Kè',
    description:
      'Hình ảnh trái dừa sáp đặc trưng của Cầu Kè với phần cơm dày, dẻo và lượng nước rất ít. Theo bài viết giới thiệu đặc sản Trà Vinh, dừa sáp gắn với vùng Cầu Kè từ câu chuyện hai cây giống đầu tiên được mang về năm 1924 và dần trở thành biểu tượng nông sản của địa phương. Nguồn tham khảo: duasap.com.vn và Wikipedia tiếng Việt.',
    origin: 'Cầu Kè, Trà Vinh',
    era: 'Tư liệu đương đại về giống dừa lịch sử',
    material: 'Ảnh tư liệu trái dừa sáp',
    collectionName: 'Tư liệu lịch sử Cầu Kè',
    status: 'published',
    image_url: 'https://duasap.com.vn/wp-content/uploads/2024/11/trai-dua-sap-3.jpg',
    view_count: 128,
    created_at: '2024-08-01T08:00:00Z',
  },
  {
    name: 'Cây dừa sáp tại vùng trồng Cầu Kè',
    description:
      'Tư liệu hình ảnh cây dừa sáp tại vùng trồng Trà Vinh. Website giới thiệu dừa sáp Trà Vinh ghi nhận từ hai cây giống ban đầu, vùng Cầu Kè đã phát triển thành vùng trồng dừa sáp lớn nhất, trở thành sản phẩm nhận diện của địa phương. Nguồn tham khảo: duasap.com.vn.',
    origin: 'Huyện Cầu Kè, Trà Vinh',
    era: 'Hiện trạng vùng trồng đương đại',
    material: 'Ảnh tư liệu vườn dừa',
    collectionName: 'Tư liệu lịch sử Cầu Kè',
    status: 'published',
    image_url: 'https://duasap.com.vn/wp-content/uploads/2024/11/cay-dua-sap-1024x683.jpg',
    view_count: 96,
    created_at: '2024-08-02T08:00:00Z',
  },
  {
    name: 'Tư liệu chế biến món ăn từ dừa sáp',
    description:
      'Hình ảnh minh họa các món và sản phẩm chế biến từ dừa sáp, phản ánh giá trị ẩm thực và thương mại của đặc sản Cầu Kè. Festival 100 năm dừa sáp Trà Vinh 2024 cũng dành hẳn không gian cho các món ăn và sản phẩm chế biến từ dừa sáp. Nguồn tham khảo: duasap.com.vn và special.nhandan.vn.',
    origin: 'Trà Vinh',
    era: 'Đương đại',
    material: 'Ảnh tư liệu chế biến thực phẩm',
    collectionName: 'Ẩm thực và sản phẩm OCOP',
    status: 'published',
    image_url: 'https://duasap.com.vn/wp-content/uploads/2024/11/che-bien-dua-sap.webp',
    view_count: 87,
    created_at: '2024-08-03T08:00:00Z',
  },
  {
    name: 'Giống dừa sáp cấy phôi của Trường Đại học Trà Vinh',
    description:
      'Tư liệu về thành quả nghiên cứu giống dừa sáp cấy phôi của Trường Đại học Trà Vinh. Báo Nhân Dân và các kết quả tìm kiếm dẫn nguồn cơ quan khoa học cho thấy nhà trường đã nghiên cứu thành công kỹ thuật nuôi cấy phôi, góp phần tăng khả năng tạo trái sáp và mở rộng vùng trồng. Nguồn tham khảo: nhandan.vn, khcnhungyen.gov.vn.',
    origin: 'Trà Vinh',
    era: '2024',
    material: 'Ảnh tư liệu nghiên cứu giống',
    collectionName: 'Thành tựu nghiên cứu và giống',
    status: 'published',
    image_url: 'https://cdn.nhandan.vn/images/22f099ca8bc7ae81aa2a8d3416a84bf8364c2dc7cb172c184e762ebbc2cb754b13635e8bc274b00e9cccd1042790f67cc21811c71e302dab6d1fdb602d206be831017b07789999476c90be6e264b4707/dua1-6297.jpg.webp',
    view_count: 73,
    created_at: '2024-10-02T08:00:00Z',
  },
  {
    name: 'Không gian Festival 100 năm dừa sáp Trà Vinh',
    description:
      'Hình ảnh ghi nhận không khí Festival 100 năm dừa sáp Trà Vinh tổ chức tại Cầu Kè từ ngày 25 đến 31/8/2024. Sự kiện tôn vinh dừa sáp như một biểu tượng kinh tế và văn hóa của địa phương, đồng thời kết nối quảng bá du lịch, thương mại và sản phẩm OCOP. Nguồn tham khảo: VTV.vn và special.nhandan.vn.',
    origin: 'Quảng trường huyện Cầu Kè, Trà Vinh',
    era: '2024',
    material: 'Ảnh báo chí sự kiện',
    collectionName: 'Festival và đời sống văn hóa',
    status: 'published',
    image_url: 'https://cdn-images.vtv.vn/66349b6076cb4dee98746cf1/2024/08/14/tra-vinh-73196530801923536504970.jpg',
    view_count: 65,
    created_at: '2024-08-25T08:00:00Z',
  },
];

const articles = [
  {
    title: 'Dừa sáp Cầu Kè: hành trình từ hai cây giống đầu tiên năm 1924',
    summary:
      'Tóm lược nguồn gốc dừa sáp Trà Vinh từ câu chuyện hai cây giống đầu tiên được mang về Cầu Kè và quá trình trở thành đặc sản tiêu biểu của địa phương.',
    content: `Theo bài viết giới thiệu trên website duasap.com.vn và các dữ liệu phổ biến trên Wikipedia tiếng Việt, câu chuyện dừa sáp tại Trà Vinh bắt đầu từ năm 1924. Sau thời gian tu học tại Campuchia, Hòa thượng Thạch Sô mang về hai cây dừa sáp giống đầu tiên và trồng tại chùa Botumsakor, khóm 5, thị trấn Cầu Kè.

Từ hạt giống ban đầu này, người dân khu vực Cầu Kè dần nhân rộng cây trồng, gìn giữ giống dừa đặc biệt có cơm dày, dẻo, béo và rất ít nước. Theo thời gian, dừa sáp trở thành sản vật nổi bật gắn chặt với danh xưng Cầu Kè, Trà Vinh.

Điểm khác biệt lớn nhất của dừa sáp là phần cơm dừa phát triển dày, mềm mịn như sáp, tạo cảm giác béo bùi rõ rệt. Chính cấu trúc khác biệt này khiến dừa sáp vừa có giá trị thực phẩm, vừa có giá trị nhận diện văn hóa đối với địa phương.

Nguồn tham khảo:
- https://duasap.com.vn/dua-sap-dac-san-tru-danh-cua-tra-vinh/
- https://vi.wikipedia.org/wiki/D%E1%BB%ABa_s%C3%A1p`,
    status: 'published',
    image_url: 'https://duasap.com.vn/wp-content/uploads/2024/11/trai-dua-sap-3.jpg',
    created_at: '2024-08-05T08:00:00Z',
  },
  {
    title: 'Đặc điểm và giá trị dinh dưỡng của dừa sáp Trà Vinh',
    summary:
      'Bài viết tổng hợp các đặc điểm cảm quan, giá trị dinh dưỡng và sức hấp dẫn thương mại của dừa sáp Cầu Kè.',
    content: `Dừa sáp được xem là đặc sản độc đáo của Trà Vinh nhờ cấu trúc trái rất khác dừa thường. Theo bài viết giới thiệu của duasap.com.vn, khi bổ trái dừa sáp, phần cơm dừa rất dày, mềm và dẻo; lượng nước bên trong ít, thậm chí gần như không có ở một số trái.

Ngoài cảm quan đặc biệt, dừa sáp còn được nhắc đến như một thực phẩm giàu dinh dưỡng với các thành phần khoáng chất phổ biến như kali, canxi, magiê, sắt và mangan. Giá trị nổi bật của dừa sáp không chỉ nằm ở hương vị béo bùi mà còn ở khả năng chế biến thành nhiều sản phẩm như sinh tố, món dầm, kem, đồ tráng miệng và các sản phẩm OCOP.

Trong các tài liệu giới thiệu festival và sản phẩm địa phương, dừa sáp Trà Vinh còn được nhấn mạnh như một biểu tượng thương hiệu nông sản cấp tỉnh, có tiềm năng lớn trong phát triển du lịch và kinh tế nông nghiệp.

Nguồn tham khảo:
- https://duasap.com.vn/dua-sap-dac-san-tru-danh-cua-tra-vinh/
- https://special.nhandan.vn/Dau-an-Festival-100-nam-dua-sap-Tra-Vinh/index.html`,
    status: 'published',
    image_url: 'https://duasap.com.vn/wp-content/uploads/2024/11/cay-dua-sap-1024x683.jpg',
    created_at: '2024-08-06T08:00:00Z',
  },
  {
    title: 'Nuôi cấy phôi dừa sáp: bước tiến quan trọng của Trường Đại học Trà Vinh',
    summary:
      'Tổng hợp các thông tin công khai về thành quả nuôi cấy phôi, cấy mô dừa sáp và ý nghĩa của chúng với vùng trồng Trà Vinh.',
    content: `Các kết quả báo chí và dữ liệu tìm kiếm công khai cho thấy Trường Đại học Trà Vinh đã nghiên cứu thành công giống dừa sáp bằng kỹ thuật nuôi cấy phôi, cấy mô. Đây là hướng đi quan trọng để cải thiện năng suất và tính ổn định của giống dừa sáp vốn có tỷ lệ trái sáp tự nhiên không cao.

Theo bài Báo Nhân Dân điện tử ngày 02/10/2024 và dữ liệu tổng hợp từ Sở Khoa học và Công nghệ Hưng Yên, công nghệ này cho phép chủ động hơn trong khâu giống, hỗ trợ nông dân mở rộng quy mô trồng và nâng cao hiệu quả kinh tế.

Ngoài ý nghĩa sản xuất, kỹ thuật nuôi cấy phôi còn góp phần bảo tồn nguồn gen đặc sản của Cầu Kè, giúp dừa sáp không chỉ là một trái ngon hiếm mà còn là đối tượng nghiên cứu nông nghiệp có giá trị.

Nguồn tham khảo:
- https://nhandan.vn/truong-dai-hoc-tra-vinh-nghien-cuu-thanh-cong-giong-dua-sap-cay-phoi-post834454.html
- http://khcnhungyen.gov.vn/tin-tuc/nghien-cuu-thanh-cong-dua-sap-cay-mo-2662`,
    status: 'published',
    image_url: 'https://cdn.nhandan.vn/images/22f099ca8bc7ae81aa2a8d3416a84bf8364c2dc7cb172c184e762ebbc2cb754b13635e8bc274b00e9cccd1042790f67cc21811c71e302dab6d1fdb602d206be831017b07789999476c90be6e264b4707/dua1-6297.jpg.webp',
    created_at: '2024-10-03T08:00:00Z',
  },
  {
    title: 'Festival 100 năm dừa sáp Trà Vinh 2024 để lại dấu ấn gì?',
    summary:
      'Tổng hợp những điểm nhấn lớn của Festival 100 năm dừa sáp Trà Vinh 2024 qua các nguồn VTV và Nhân Dân.',
    content: `Theo VTV.vn, Festival 100 năm dừa sáp Trà Vinh diễn ra từ ngày 25 đến 31/8/2024 tại huyện Cầu Kè với chủ đề “Hương vị miền đất phúc”. Đây là lần đầu tiên tỉnh Trà Vinh tổ chức sự kiện quy mô riêng để tôn vinh dừa sáp.

Bài chuyên đề của Báo Nhân Dân ghi nhận festival thu hút hơn 350 đại biểu và hàng chục nghìn du khách. Trong tuần lễ sự kiện có hội thi chế biến món ăn, hội chợ thương mại, hội thảo “Dừa sáp Trà Vinh - 100 năm hình thành và phát triển”, cùng tọa đàm “Du lịch Cầu Kè - Tiềm năng ven sông Hậu”.

Theo Nhân Dân, doanh thu toàn tuần lễ đạt hơn 41 tỷ đồng và lượng khách tham quan vượt 43.540 lượt. Festival cho thấy dừa sáp không chỉ là sản phẩm nông nghiệp đặc sắc mà còn có thể trở thành hạt nhân cho du lịch, thương mại và xây dựng thương hiệu địa phương.

Nguồn tham khảo:
- https://vtv.vn/doi-song/tra-vinh-to-chuc-festival-100-nam-dua-sap-20240814125159359.htm
- https://special.nhandan.vn/Dau-an-Festival-100-nam-dua-sap-Tra-Vinh/index.html`,
    status: 'published',
    image_url: 'https://special.nhandan.vn/Dau-an-Festival-100-nam-dua-sap-Tra-Vinh/assets/8sqJt0LMaz/dua-ngang-social-cover.jpg',
    created_at: '2024-09-01T08:00:00Z',
  },
];

const events = [
  {
    title: 'Festival 100 năm dừa sáp Trà Vinh',
    description:
      'Sự kiện lần đầu tổ chức tại huyện Cầu Kè từ ngày 25 đến 31/8/2024 nhằm tôn vinh, quảng bá thương hiệu dừa sáp Trà Vinh. Theo VTV và Nhân Dân, festival có lễ khai mạc sân khấu hóa, hội thi chế biến 100 món ăn từ dừa sáp, hội chợ thương mại, hội thảo về dừa sáp và các hoạt động xúc tiến du lịch. Nguồn: VTV.vn, special.nhandan.vn.',
    location: 'Huyện Cầu Kè, tỉnh Trà Vinh',
    start_date: '2024-08-25',
    end_date: '2024-08-31',
    status: 'published',
    image_url: 'https://cdn-images.vtv.vn/66349b6076cb4dee98746cf1/2024/08/14/tra-vinh-73196530801923536504970.jpg',
    created_at: '2024-08-15T08:00:00Z',
  },
  {
    title: 'Hội thảo “Dừa sáp Trà Vinh - 100 năm hình thành và phát triển”',
    description:
      'Hoạt động điểm nhấn trong khuôn khổ Festival 100 năm dừa sáp Trà Vinh 2024. Bài chuyên đề của Nhân Dân cho biết hội thảo quy tụ chuyên gia, nhà khoa học và doanh nghiệp để thảo luận về tiềm năng phát triển, mở rộng thị trường và ứng dụng công nghệ mới đối với dừa sáp Trà Vinh. Nguồn: special.nhandan.vn.',
    location: 'Huyện Cầu Kè, tỉnh Trà Vinh',
    start_date: '2024-08-28',
    end_date: '2024-08-28',
    status: 'published',
    image_url: 'https://special.nhandan.vn/Dau-an-Festival-100-nam-dua-sap-Tra-Vinh/assets/8sqJt0LMaz/dua-ngang-social-cover.jpg',
    created_at: '2024-08-28T08:00:00Z',
  },
  {
    title: 'Vu lan Thắng hội huyện Cầu Kè 2024',
    description:
      'Trong khuôn khổ tuần lễ sự kiện tại Cầu Kè, ngày 27/8/2024 địa phương công bố Quyết định công nhận Lễ hội Vu lan Thắng hội huyện Cầu Kè là Di sản văn hóa phi vật thể quốc gia. Theo VTV và Nhân Dân, đây là hoạt động văn hóa quan trọng gắn với cộng đồng người Hoa tại Cầu Kè và tạo thêm chiều sâu cho chuỗi hoạt động quảng bá dừa sáp Trà Vinh. Nguồn: VTV.vn, special.nhandan.vn.',
    location: 'Quảng trường huyện Cầu Kè, Trà Vinh',
    start_date: '2024-08-27',
    end_date: '2024-08-27',
    status: 'published',
    image_url: 'https://special.nhandan.vn/Dau-an-Festival-100-nam-dua-sap-Tra-Vinh/assets/8sqJt0LMaz/dua-ngang-social-cover.jpg',
    created_at: '2024-08-27T08:00:00Z',
  },
];

function mustData(result, label) {
  if (result.error) {
    throw new Error(`${label}: ${result.error.message}`);
  }
  return result.data;
}

function mustCount(result, label) {
  if (result.error) {
    throw new Error(`${label}: ${result.error.message}`);
  }
  return result.count ?? 0;
}

async function main() {
  const viewCountProbe = await supabase
    .from('artifacts')
    .select('view_count')
    .limit(1);
  const hasViewCount = !viewCountProbe.error;

  await mustData(await supabase.from('artifacts').delete().not('id', 'is', null), 'delete artifacts');
  await mustData(await supabase.from('articles').delete().not('id', 'is', null), 'delete articles');
  await mustData(await supabase.from('events').delete().not('id', 'is', null), 'delete events');
  await mustData(await supabase.from('collections').delete().not('id', 'is', null), 'delete collections');
  await mustData(await supabase.from('categories').delete().not('id', 'is', null), 'delete categories');

  const insertedCategories = mustData(
    await supabase.from('categories').insert(categories).select('id, name'),
    'insert categories'
  );
  const categoryMap = new Map(insertedCategories.map((item) => [item.name, item.id]));

  const insertedCollections = mustData(
    await supabase
      .from('collections')
      .insert(
        collections.map((item) => ({
          name: item.name,
          description: item.description,
          category_id: categoryMap.get(item.categoryName) ?? null,
        }))
      )
      .select('id, name'),
    'insert collections'
  );
  const collectionMap = new Map(insertedCollections.map((item) => [item.name, item.id]));

  await mustData(
    await supabase.from('artifacts').insert(
      artifacts.map((item) => ({
        name: item.name,
        description: item.description,
        origin: item.origin,
        era: item.era,
        material: item.material,
        collection_id: collectionMap.get(item.collectionName) ?? null,
        status: item.status,
        image_url: item.image_url,
        created_at: item.created_at,
        ...(hasViewCount ? { view_count: item.view_count } : {}),
      }))
    ),
    'insert artifacts'
  );

  await mustData(await supabase.from('articles').insert(articles), 'insert articles');
  await mustData(await supabase.from('events').insert(events), 'insert events');

  const artifactCount = mustCount(
    await supabase.from('artifacts').select('*', { count: 'exact', head: true }),
    'count artifacts'
  );
  const articleCount = mustCount(
    await supabase.from('articles').select('*', { count: 'exact', head: true }),
    'count articles'
  );
  const eventCount = mustCount(
    await supabase.from('events').select('*', { count: 'exact', head: true }),
    'count events'
  );

  console.log(
    JSON.stringify(
      {
        categories: insertedCategories.length,
        collections: insertedCollections.length,
        hasViewCount,
          artifacts: artifactCount,
          articles: articleCount,
          events: eventCount,
        artifactNames: artifacts.map((item) => item.name),
        articleTitles: articles.map((item) => item.title),
        eventTitles: events.map((item) => item.title),
      },
      null,
      2
    )
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});