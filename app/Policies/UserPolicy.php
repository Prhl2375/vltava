<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }
	public function viewAny(User $user):bool
	{
		return $user->role === 'admin'; // Only admins can see the resource
	}

	public function view(User $user):bool
	{
		return $user->role === 'admin';
	}

	public function create(User $user)
	{
		return $user->role === 'admin';
	}

	public function update(User $user)
	{
		return $user->role === 'admin';
	}

	public function delete(User $user)
	{
		return $user->role === 'admin';
	}
}
