<?php

namespace AdminBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use AdminBundle\Form\UserType;
use AdminBundle\Form\AvatarType;


class UserController extends Controller {

    public function indexAction() {
        $userManager = $this->get('fos_user.user_manager');
        $users = $userManager->findUsers();

        return $this->render(
            'AdminBundle:Users:index.html.twig', 
            array('users' =>  $users)
        );
    }

    public function updateAction($id, Request $request)
    {   
        // GET USER
        $userManager = $this->get('fos_user.user_manager');
        $user = $userManager->findUserBy(array('id' => $id));

        // GENERATE FORMS
        $form_user = $this->createForm(UserType::class, $user);
        $form_avatar = $this->createForm(AvatarType::class, $user, array(
                    'action' => $this->generateUrl('admin_update_user', 
                        array('id' => $id ))
                    ));

        // CHECK WHICH FORM HAS BEEN SUDMITTED 
        if ($request->request->has($form_avatar->getName())) {
            // AVATAR
            $form_avatar->handleRequest($request);
            if ($form_avatar->isSubmitted() && $form_avatar->isValid()) {
                $avatar = $user->getAvatar();
                $avatarName = $this->get('app.avatar_uploader')->upload($avatar);
                $user->setAvatar($avatarName);
                $userManager->updateUser($user);
                return $this->render(
                    'AdminBundle::Users/avatar.html.twig', 
                    array('user' =>  $user)
                );
            } 
        } else if ($request->request->has($form_user->getName())) {
            // USER
            $form_user->handleRequest($request);
            if ($form_user->isSubmitted())  {
                $userManager->updateUser($user);
                return $this->redirectToRoute('admin_show_users');
            }
        }

        // RENDER VIEW
        return $this->render(
            'AdminBundle:Users:edit.html.twig', 
            array(
                'form_user' => $form_user->createView(), 
                'form_avatar' => $form_avatar->createView(), 
                'user' =>  $user
            )
        );
    }

	public function createAction(Request $request) 
    {   
        $userManager = $this->get('fos_user.user_manager');
        $user = $userManager->createUser();

        $form = $this->createForm(UserType::class, $user,[
                'action' => $this->generateUrl('admin_create_user')
        ]);

        $this->ValidForm($user, $request, $form, $userManager);

        return $this->render(
            'AdminBundle:Users:new.html.twig', 
            array('form' => $form->createView(), 'user' =>  $user)
        );
    }

    public function deleteAction($id) 
    {	
    	$userManager = $this->get('fos_user.user_manager');
        $user = $userManager->findUserBy(array('id' => $id));
		$userManager->deleteUser($user);

        return $this->redirectToRoute('admin_show_users');
    }

    public function ValidForm($user, $request, $form, $userManager){

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $data_avatar = $form["avatar"]->getData();
            if(!empty($data_avatar)){
                $avatar = $user->getAvatar();
                $avatarName = $this->get('app.avatar_uploader')->upload($avatar);
                $user->setAvatar($avatarName);
            } 
            $userManager->updateUser($user);
            return $this->redirectToRoute('admin_show_users');
        }
        
    }

}