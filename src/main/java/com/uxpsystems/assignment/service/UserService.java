package com.uxpsystems.assignment.service;

import java.util.List;

import com.uxpsystems.assignment.model.User;

public interface UserService {
	List<User> getUsersByName(String username) throws Exception;
	
	List<User> getAllUsers();
	
	User createNewUer(User user) throws Exception;
	
	User deleteUser(int userid) throws Exception ;
	
	User updateUser(User user) throws Exception;
	
}
