<?php

/**
 * Theme Settings
 *
 * @author Attila Németh
 * 21.03.2021
 */

use Drupal\Core\Form\FormStateInterface;

/**
 * Implements hook_form_FORM_ID_alter()
 */
function attus_form_system_theme_settings_alter(&$form, FormStateInterface $form_state)
{
  $form['color'] = [
    '#type' => 'fieldset',
    '#title' => t('Color'),
    'primary-color' => [
      '#type' => 'select',
      '#title' => t('Primary color'),
      '#options' => attus_color_options(),
      '#default_value' => theme_get_setting('primary-color'),
      '#required' => TRUE,
      '#empty_option' => t('Select'),
    ],
    'secondary-color' => [
      '#type' => 'select',
      '#title' => t('Secondary color'),
      '#options' => attus_color_options(),
      '#default_value' => theme_get_setting('secondary-color'),
      '#required' => TRUE,
      '#empty_option' => t('Select'),
    ],
  ];
}

/**
 * Available colors. Actual color codes have to be defined in CSS. 
 * @return array
 */
function attus_color_options(): array
{
  $colors = [
    'blue'          => t('Blue'),
    'yellow'        => t('Yellow'),
    'red'           => t('Red'),
    'green'         => t('Green'),
  ];
  return $colors;
}