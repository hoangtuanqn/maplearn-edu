<?php

namespace App\Observers;

use App\Helpers\CommonHelper;
use App\Models\Post;

class PostObserver
{
    public function creating(Post $post)
    {
        if (empty($post->slug)) {
            $post->slug = CommonHelper::generateSlug($post->title);
        }
    }
    /**
     * Handle the Post "created" event.
     */
    public function created(Post $post): void
    {
        //
    }

    /**
     * Handle the Post "updated" event.
     */
    public function updated(Post $post): void
    {
        //
    }

    /**
     * Handle the Post "deleted" event.
     */
    public function deleted(Post $post): void
    {
        //
    }

    /**
     * Handle the Post "restored" event.
     */
    public function restored(Post $post): void
    {
        //
    }

    /**
     * Handle the Post "force deleted" event.
     */
    public function forceDeleted(Post $post): void
    {
        //
    }
}
