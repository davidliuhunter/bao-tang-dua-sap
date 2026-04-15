-- ============================================================
-- Bảo tàng Dừa Sáp - Seed Data (Dữ liệu mẫu)
-- Chạy sau 001_schema.sql
-- ============================================================

-- Danh mục
insert into public.categories (name, description) values
  ('Dừa Sáp', 'Các hiện vật liên quan đến giống dừa đặc biệt Dừa Sáp'),
  ('Công cụ truyền thống', 'Dụng cụ sản xuất, chế biến dừa truyền thống'),
  ('Sản phẩm chế biến', 'Các sản phẩm từ dừa Cầu Kè');

-- Bộ sưu tập
insert into public.collections (name, description, category_id)
select 'Bộ sưu tập gốc Cầu Kè', 'Dừa gốc từ các vườn lâu đời tại Cầu Kè', id
  from public.categories where name = 'Dừa Sáp' limit 1;

insert into public.collections (name, description, category_id)
select 'Dụng cụ thủ công', 'Công cụ thủ công nghề dừa', id
  from public.categories where name = 'Công cụ truyền thống' limit 1;

insert into public.collections (name, description, category_id)
select 'Sản phẩm đặc trưng', 'Sản phẩm nổi tiếng từ dừa sáp', id
  from public.categories where name = 'Sản phẩm chế biến' limit 1;

-- Hiện vật
insert into public.artifacts (name, description, origin, era, material, collection_id, status)
select
  'Quả Dừa Sáp nguyên bản',
  'Quả dừa sáp nguyên bản từ vườn dừa lâu đời nhất tại Cầu Kè, Trà Vinh. Đây là giống dừa đột biến tự nhiên độc đáo, phần cơm đặc như thạch thay vì dạng nước thông thường.',
  'Cầu Kè, Trà Vinh', 'Đầu thế kỷ XX', 'Tự nhiên',
  id, 'published'
from public.collections where name = 'Bộ sưu tập gốc Cầu Kè' limit 1;

insert into public.artifacts (name, description, origin, era, material, collection_id, status)
select
  'Cái nạo dừa cổ',
  'Dụng cụ nạo cơm dừa truyền thống được chế tác bằng gỗ mít và thanh kim loại, dùng trong hàng trăm hộ gia đình tại Cầu Kè qua nhiều thế hệ.',
  'Cầu Kè, Trà Vinh', 'Giữa thế kỷ XX', 'Gỗ mít, kim loại',
  id, 'published'
from public.collections where name = 'Dụng cụ thủ công' limit 1;

insert into public.artifacts (name, description, origin, era, material, collection_id, status)
select
  'Kẹo dừa sáp thủ công',
  'Mẫu kẹo dừa sáp được chế biến theo phương pháp thủ công truyền thống. Kẹo dừa sáp có hương vị đặc biệt nhờ hàm lượng dầu cao và kết cấu béo mịn của cơm dừa.',
  'Cầu Kè, Trà Vinh', 'Hiện đại', 'Dừa sáp, đường, malt',
  id, 'published'
from public.collections where name = 'Sản phẩm đặc trưng' limit 1;

insert into public.artifacts (name, description, origin, era, material, collection_id, status)
select
  'Tranh vẽ vườn dừa Cầu Kè',
  'Bức tranh sơn dầu mô tả cảnh quan vườn dừa sáp tại Cầu Kè vào thập niên 1980, ghi lại hình ảnh những hàng dừa cao vút và cuộc sống bình yên của người dân địa phương.',
  'Cầu Kè, Trà Vinh', 'Thập niên 1980', 'Sơn dầu trên canvas',
  id, 'published'
from public.collections where name = 'Bộ sưu tập gốc Cầu Kè' limit 1;

-- Bài viết
insert into public.articles (title, summary, content, status) values
(
  'Nguồn gốc và đặc điểm của Dừa Sáp Cầu Kè',
  'Tìm hiểu về nguồn gốc và những đặc điểm độc đáo của giống dừa sáp nổi tiếng Cầu Kè, Trà Vinh.',
  E'Dừa Sáp (Cocos nucifera L. var. Makapuno) là giống dừa đặc biệt xuất hiện do đột biến gen tự nhiên. Khác với dừa thường, cơm dừa sáp có kết cấu đặc sệt như thể đông đặc lại, với hàm lượng dầu cao và hương thơm đặc trưng.\n\nTại Việt Nam, Cầu Kè (Trà Vinh) là nơi tập trung nhiều nhất các vườn dừa sáp với hơn 300 năm lịch sử trồng trọt. Người Khmer bản địa đã gìn giữ và phát triển giống dừa quý này qua nhiều thế hệ.\n\nĐặc điểm nhận biết: quả dừa sáp khi lắc không nghe tiếng nước bên trong, vỏ sần và hơi sẫm màu hơn dừa thường. Tỷ lệ ra quả sáp trong một buồng dừa thường chỉ đạt 20–30%, điều này làm tăng thêm sự quý hiếm của nó.',
  'published'
),
(
  'Công nghệ bảo tồn và nhân giống Dừa Sáp hiện đại',
  'Khám phá các phương pháp khoa học hiện đại trong bảo tồn và nhân giống dừa sáp để phát triển thương mại bền vững.',
  E'Trong những năm gần đây, các nhà khoa học tại Viện Nghiên cứu Dầu và Cây có dầu TP.HCM đã nghiên cứu thành công phương pháp nhân giống dừa sáp thông qua kỹ thuật nuôi cấy phôi.\n\nKỹ thuật này cho phép tạo ra các cây dừa sáp thuần chủng với tỷ lệ cho quả sáp lên đến 90–100%, khắc phục hạn chế lớn nhất của giống dừa này trong sản xuất thương mại.\n\nHiện nay, diện tích trồng dừa sáp tại Cầu Kè đã được mở rộng và nhân giống sang các tỉnh khác trong vùng ĐBSCL, đưa sản phẩm dừa sáp Cầu Kè trở thành thương hiệu nông sản nổi tiếng của Trà Vinh.',
  'published'
);

-- Sự kiện
insert into public.events (title, description, location, start_date, end_date, status) values
(
  'Lễ hội Dừa Sáp Cầu Kè 2026',
  'Lễ hội thường niên tôn vinh giống dừa đặc sản của Trà Vinh. Chương trình bao gồm: triển lãm hiện vật, trình diễn chế biến truyền thống, hội thi sản phẩm từ dừa sáp, và các hoạt động văn hóa Khmer.',
  'Trung tâm Văn hóa huyện Cầu Kè, Trà Vinh', '2026-07-15', '2026-07-17', 'published'
),
(
  'Triển lãm "Di sản Dừa Sáp" tại TP.HCM',
  'Triển lãm giới thiệu văn hóa, lịch sử và giá trị kinh tế của Dừa Sáp Cầu Kè đến người dân thành thị. Trưng bày hiện vật gốc, ảnh tư liệu và sản phẩm hiện đại từ dừa sáp.',
  'Nhà Văn hóa Thanh Niên, Q.1, TP.HCM', '2026-09-20', '2026-09-25', 'published'
);
