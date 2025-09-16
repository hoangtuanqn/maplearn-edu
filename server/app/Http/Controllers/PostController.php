<?php

namespace App\Http\Controllers;

use App\Filters\Post\CourseFilter;
use App\Http\Controllers\Api\BaseApiController;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Gate;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class PostController extends BaseApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $limit = (int)($request->limit ?? 10); // Giới hạn tối đa 100 items

        $posts = QueryBuilder::for(Post::class)
            ->allowedFilters(['title',  AllowedFilter::custom('courses', new CourseFilter)])
            ->select(['id', 'slug', 'thumbnail', 'title', 'views', 'created_by', 'created_at'])
            ->allowedSorts(['created_at', 'views'])
            ->where('status', true)
            ->with(['creator:id,full_name']) // đảm bảo quan hệ creator đã được định nghĩa
            ->orderByDesc('id')
            ->paginate($limit);

        return $this->successResponse($posts, 'Lấy danh sách bài viết thành công!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Post $post)
    {
        $data = [
            'posts' => $post,
        ];
        return $this->successResponse($data, 'Lấy chi tiết bài viết thành công!');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Gate::authorize('create', Post::class);
        $data = $request->all();

        $validated = validator($data, [
            'title'       => 'required|string',
            'thumbnail'   => 'required|string',
            'content'     => 'required|string',
            'category_id' => 'required|exists:document_categories,id',

        ])->validate();

        $validated['created_by'] = $request->user()->id;
        $post                    = Post::create($validated);
        return $this->successResponse($post, 'Tạo bài viết mới thành công!', Response::HTTP_CREATED);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        Gate::authorize('update', $post);
        $post->update($request->validate([
            'title'   => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string',

        ]));
        return $this->successResponse($post, 'Cập nhật bài viết thành công!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        Gate::authorize('delete', $post);
        $post->delete();
        return $this->noContentResponse();
    }

    /**
     * Tăng lượt xem bài viết
     */
    public function increaseView(Post $post)
    {
        $post->increment('views');
        return $this->successResponse('Tăng lượt xem bài viết thành công!');
    }

    public function showDataAI(Request $request)
    {
        $limit = (int)($request->limit ?? 10); // Giới hạn tối đa 100 items
        $page  = (int)($request->page ?? 1); // Giới hạn offset
        $data  = Post::query()
            ->select(['id', 'title', 'slug'])
            ->where('status', true)
            ->orderByDesc('id')
            ->offset(($page - 1) * $limit)
            ->limit($limit)
            ->get()
            ->each(function ($post) {
                $post->makeHidden(['creator']);
            });

        return $this->successResponse($data, 'Lấy dữ liệu AI thành công!');
    }
}
