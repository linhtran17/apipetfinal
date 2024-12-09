-- USERS --

CREATE TABLE Users (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Username VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(100)  NULL DEFAULT 'customer',
    Last_login TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    Create_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    Address TEXT NOT NULL
);


CREATE TABLE IF NOT EXISTS CategoryPets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
);



CREATE TABLE IF NOT EXISTS news (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    image VARCHAR(255),
    published_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status ENUM('published', 'draft') NOT NULL DEFAULT 'draft'
);


INSERT INTO news (title, content, image, published_date, status) VALUES
('Cách chăm sóc thú cưng trong mùa đông', 'Mùa đông đến, việc chăm sóc thú cưng cần được đặc biệt chú ý. Hãy đảm bảo thú cưng của bạn được giữ ấm và có nơi trú ẩn an toàn.', 'care_winter.jpg', '2024-10-01', 'published'),
('Những món ăn tốt nhất cho chó', 'Có rất nhiều loại thực phẩm tốt cho sức khỏe của chó. Hãy cùng khám phá những món ăn ngon miệng và bổ dưỡng cho chó của bạn.', 'dog_food.jpg', '2024-09-28', 'published'),
('Chọn mua đồ chơi cho mèo', 'Đồ chơi là rất quan trọng để giữ cho mèo của bạn luôn vui vẻ và khỏe mạnh. Hãy cùng tìm hiểu cách chọn đồ chơi phù hợp cho mèo.', 'cat_toy.jpg', '2024-09-25', 'published'),
('Giải pháp cho mèo không chịu ăn', 'Nếu mèo của bạn không chịu ăn, hãy thử một số giải pháp hữu ích dưới đây để khuyến khích chúng ăn uống trở lại.', 'cat_eating.jpg', '2024-09-22', 'published'),
('Tại sao chó sủa nhiều?', 'Nhiều người nuôi chó thường gặp phải vấn đề chó sủa quá nhiều. Bài viết này sẽ giúp bạn tìm hiểu nguyên nhân và cách khắc phục.', 'dog_barking.jpg', '2024-09-20', 'published'),
('Các giống mèo phổ biến nhất', 'Có rất nhiều giống mèo trên thế giới, mỗi giống có những đặc điểm riêng. Hãy cùng điểm qua những giống mèo phổ biến nhất.', 'popular_cats.jpg', '2024-09-18', 'published'),
('Hướng dẫn cách tắm cho chó', 'Tắm cho chó là một phần quan trọng trong việc chăm sóc thú cưng. Hãy tham khảo hướng dẫn chi tiết cách tắm cho chó.', 'dog_bathing.jpg', '2024-09-15', 'published'),
('Mèo và những thói quen kỳ lạ', 'Mèo thường có những thói quen kỳ lạ mà chúng ta không hiểu. Bài viết này sẽ giúp bạn hiểu thêm về những hành vi của mèo.', 'cat_behaviors.jpg', '2024-09-12', 'published'),
('Cách giữ cho chó luôn khỏe mạnh', 'Chăm sóc sức khỏe cho chó là rất quan trọng. Hãy cùng tìm hiểu cách giữ cho chó của bạn luôn khỏe mạnh và vui vẻ.', 'healthy_dog.jpg', '2024-09-10', 'published'),
('Những bệnh thường gặp ở mèo', 'Mèo cũng có thể mắc nhiều bệnh. Bài viết này sẽ giúp bạn nhận biết và phòng tránh những bệnh thường gặp ở mèo.', 'cat_diseases.jpg', '2024-09-08', 'published'),
('Thú cưng và tác động đến tâm lý con người', 'Nhiều nghiên cứu cho thấy thú cưng có tác động tích cực đến tâm lý con người. Hãy cùng tìm hiểu thêm về điều này.', 'pets_mental_health.jpg', '2024-09-05', 'published'),
('Chó và việc đi dạo hàng ngày', 'Đi dạo là một phần không thể thiếu trong cuộc sống của chó. Hãy cùng khám phá lợi ích của việc đi dạo hàng ngày.', 'dog_walking.jpg', '2024-09-02', 'published'),
('Mèo con và cách chăm sóc', 'Mèo con cần được chăm sóc đặc biệt để phát triển khỏe mạnh. Bài viết này sẽ hướng dẫn bạn cách chăm sóc mèo con.', 'kitten_care.jpg', '2024-08-30', 'published'),
('Các giống chó phổ biến nhất', 'Có nhiều giống chó khác nhau với những đặc điểm riêng. Hãy cùng tìm hiểu về những giống chó phổ biến nhất.', 'popular_dogs.jpg', '2024-08-28', 'published'),
('Tại sao mèo lại thích ngủ nhiều?', 'Mèo thường ngủ rất nhiều, và điều này là hoàn toàn bình thường. Hãy cùng tìm hiểu lý do tại sao mèo lại thích ngủ.', 'cat_sleeping.jpg', '2024-08-25', 'published'),
('Cách làm sạch lông cho chó', 'Làm sạch lông cho chó là một phần quan trọng trong việc chăm sóc thú cưng. Hãy tham khảo một số mẹo để làm sạch lông cho chó hiệu quả.', 'dog_grooming.jpg', '2024-08-22', 'published'),
('Mẹo giúp chó không bị stress', 'Chó cũng có thể bị stress như con người. Hãy tham khảo một số mẹo giúp chó của bạn cảm thấy thoải mái hơn.', 'dog_stress.jpg', '2024-08-20', 'published'),
('Cách chọn mua thức ăn cho mèo', 'Chọn đúng loại thức ăn cho mèo là rất quan trọng. Hãy cùng tìm hiểu cách chọn mua thức ăn cho mèo đúng cách.', 'cat_food_guide.jpg', '2024-08-18', 'published'),
('Đồ dùng cần thiết cho chó', 'Khi nuôi chó, có một số đồ dùng cần thiết mà bạn cần chuẩn bị. Bài viết này sẽ giúp bạn liệt kê những đồ dùng cần thiết.', 'dog_essentials.jpg', '2024-08-15', 'published'),
('Chăm sóc thú cưng khi bạn đi vắng', 'Khi bạn đi vắng, việc chăm sóc thú cưng cần được chú ý. Hãy cùng tìm hiểu cách chăm sóc thú cưng khi bạn không có nhà.', 'pet_care_vacation.jpg', '2024-08-12', 'published'),
('Tại sao chó lại thích vẫy đuôi?', 'Vẫy đuôi là một trong những cách giao tiếp của chó. Hãy cùng tìm hiểu ý nghĩa của hành động này.', 'dog_tail_wagging.jpg', '2024-08-10', 'published'),
('Lợi ích của việc nuôi thú cưng', 'Nuôi thú cưng không chỉ mang lại niềm vui mà còn nhiều lợi ích sức khỏe. Hãy cùng khám phá những lợi ích này.', 'benefits_of_pets.jpg', '2024-08-07', 'published'),
('Chó và việc học lệnh', 'Học lệnh không chỉ giúp chó trở nên ngoan ngoãn mà còn giúp tăng cường sự gắn bó giữa chó và chủ.', 'dog_training.jpg', '2024-08-05', 'published'),
('Cách xử lý khi thú cưng bị bệnh', 'Khi thú cưng bị bệnh, bạn cần biết cách xử lý kịp thời. Hãy cùng tham khảo một số bước xử lý khi thú cưng bị bệnh.', 'pet_health.jpg', '2024-08-02', 'published');



CREATE TABLE order_details (
    orderId INT NOT NULL,
    productId INT NOT NULL,
    price FLOAT,
    discount FLOAT,
    quantity INT NOT NULL,
    note VARCHAR(255) NULL,
    PRIMARY KEY (orderId, productId)
);

CREATE TABLE orders (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(255),
    total FLOAT NOT NULL,
    status ENUM('created', 'pending', 'published', 'deliveried', 'cancel') DEFAULT 'created',
    fullname VARCHAR(255) NOT NULL,
    note VARCHAR(255),
    deliveryAddress VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    orderAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deliveryAt DATETIME,
    updateAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);




