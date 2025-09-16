<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;

use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class PusherEvent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message;
    public $email;

    public function __construct($message, $email = null)
    {
        $this->message = $message;
        $this->email   = $email;
    }

    // Tên channel phải trùng với frontend: "my-channel"
    public function broadcastOn()
    {
        return new Channel($this->email); // public channel
    }

    // Tên event phải trùng frontend: "my-event"
    public function broadcastAs()
    {
        return 'my-event';
    }
}
