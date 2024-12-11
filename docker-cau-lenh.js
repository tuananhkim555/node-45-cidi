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
 * docker run -d -p 3070:3069 --name cons-be-aligo-media img-aligo_media
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
 * 
 * các câu lệnh thao tác trên server
 *  
 * 
 * xem danh sách các forder và các file hiện có
 *  ls -la
 * 
 * tạo folder
 *  mkdir tên_folder
 * 
 * di chuyển vào
 *  cd tên_folder
 * 
 * di chuyển lùi
 *  cd ../
 * 
 * tạo file
 *  touch tên_file
 * 
 * ghi file bằng tool nano
 *  nano tên_file
 * 
 * lưu file với nano
 *  ctrl + o + enter => sever
 * ctrl + x => exit
 * 
 * 
 * lệnh kẹp sudo
 *  sudo su
 * 
 * thoát kẹp sudo su
 *  exit
 * 
 * xem log của terminal trong docker:
 *  docker container logs id_name_container
 *  docker logs id_name_container
 * 
 * 
 * truy cập vào terminal của container
 * docker exec -it id_name_container /bin/sh
 * exit: thoát
 * 
 * chạy lại container
 * docker container restart 015a04f640fa
 * 
 */