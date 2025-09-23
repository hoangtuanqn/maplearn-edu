<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Video mới trong khóa học</title>
</head>

<body>
    <p>Xin chào,</p>
    <p>Khóa học <strong>{{ $course->name }}</strong> vừa được thêm video mới: <strong>{{ $video->title }}</strong>.</p>
    <p><a href="{{ $videoUrl }}">Bấm vào đây để xem video</a></p>
    <p>Chúc bạn học tập hiệu quả!</p>
</body>

</html>
