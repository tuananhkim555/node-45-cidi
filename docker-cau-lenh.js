/**
 * - Build Image từ docker file
 * docker build dường_dẫn_file_docker -t ten_image
 * docker build . -t img-aligo_media
 * 
 * Login:
 * - docker login -u dinhtuananh
 * docker build . -t img-aligo_media
 * 
 * 
 * - chạy container
 * docker run -d -p 3070:3069 --name ten_container tên_image
 * docker run -d -p 3070:3069 --name cons-be-aligo-media img-be_aligo_media
 * 
 * 
 * - lấy địa chỉ IP của 1 container
 * docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' id_name_container
 *
 * 
 * - lấy danh sách image hiện có
 * docker image list
 * 
 * - xóa image
 * docker image remove id_name_image
 * 
 * 
 * - dừng container
 * docker container stop id_name_container
 * 
 * - xóa container
 * docker container remove id_name _container
 * 
 * 
 * 
 * - chạy docker compose (tạo ra 2 container cùng nhau)
 * docker compose up -d
 * 
 * 
 * - dừng docker compose
 * docker compose down
 * 
 */